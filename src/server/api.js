import fetch from 'isomorphic-fetch';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { isNil } from 'ramda';

import { upsert } from './db/user';
import logger from './logger';
import blogs from './api/blogs';

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
const SECRET = fs.readFileSync('private.key');

/**
 * If user does not exist, create user, then create session and return mashup of them all
 * @param {object} githubUser The github user to create
 * @param {object} res The express response object
 * @return {object} The newly created user and session token
 */
const createUserAndToken = githubUser => {
  return upsert(githubUser)
    .then(bloomburgerUser => {
      logger.log(`Creating JWT token for bloomburger user: ${bloomburgerUser.id}`);
      const jwtToken = jwt.sign({ bloomburgerUser }, SECRET, { expiresIn: SEVEN_DAYS_IN_SECONDS });
      return { ...bloomburgerUser, token: jwtToken };
    });
};

/**
 * Handles authenticating with github, by exchanging the OAuth code for an access token
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const authenticate = (req, res) => {
  const { code } = req.body;
  const clientSecret = process.env.BLOOMBURGER_GITHUB_CLIENT_SECRET;
  const clientId = process.env.BLOOMBURGER_GITHUB_CLIENT_ID;

  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'bloomburger',
    },
    body: JSON.stringify({ code, client_secret: clientSecret, client_id: clientId }),
  };

  logger.log(`Making request to github with config: ${JSON.stringify(config)}`);
  return fetch('https://github.com/login/oauth/access_token', config)
    .then(response => {
      return response.json().then(json => {
        if (!response.ok) {
          res.status(502).json(json);
          return null;
        }

        const accessToken = json.access_token;
        const userConfig = {
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'bloomburger',
          }
        };
        return fetch('https://api.github.com/user', userConfig)
          .then(userResponse => {
            return userResponse.json().then(userJson => {
              if (!userResponse.ok) {
                res.status(502).json(userJson);
                return null;
              }

              return createUserAndToken({ ...userJson, access_token: accessToken }).then(user => res.json(user));
            });
          });
      });
    })
    .catch(e => {
      logger.error(e);
      if (e.name && e.name === 'FetchError') {
        res.status(502);
        return res.json({ error: 'Failed to exchange OAuth code for access token', details: e.reason });
      }

      res.status(500);
      return res.json({ error: 'Failed to exchange OAuth code for access token' });
    });
};

/**
 * Ensures that the given request has a valid Bearer token
 * @param {object} req The express request object
 * @param {object} res The express response object
 * @param {Function} next Next function
 */
const authMiddleware = (req, res, next) => {
  // check if the user is authenticated and, if so, attach user to the request
  const bearer = req.headers.authorization;
  if (isNil(bearer)) {
    res.status(401);
    return res.json({ error: 'Invalid bearer token' });
  }

  const onJwtDecoded = (err, decodedJwt) => {
    if (err) {
      logger.error(`Failed to decode bearer token: ${err}`);
      res.status(401);
      return res.json({ error: 'Bearer token has expired' });
    }

    logger.log(`Setting user on request to user: ${JSON.stringify(decodedJwt.bloomburgerUser)}`);
    req.user = decodedJwt.bloomburgerUser;
    return next();
  };

  // Bearer abc --> abc
  const token = bearer.split(' ')[1];
  return jwt.verify(token, SECRET, onJwtDecoded);
};

/**
 * Top level function that defines what functions will handle what API requests
 * @param {object} expressApp The express app to add any API definitions to
 */
const init = expressApp => {
  expressApp.use(bodyParser.json());

  // authentication APIs
  expressApp.post('/api/v1/oauth', authenticate);

  // setup blog APIs
  blogs(expressApp, authMiddleware);
};

export default init;

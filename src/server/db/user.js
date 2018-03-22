import {isNil} from 'ramda';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const SECRET = fs.readFileSync('private.key');

import pg from './pg';
import logger from '../logger';

const toGithubDbUser = githubUser => ({
  id: githubUser.id,
  username: githubUser.login,
  name: githubUser.name,
  bio: githubUser.bio,
  photo: githubUser.avatar_url,
  access_token: jwt.sign({access_token: githubUser.access_token}, SECRET)
});

/**
 * Creates a new user
 * @param {object} githubUser The github user to create in bloomburger
 * @return {object} The newly created user
 */
const create = (githubUser) => {
  logger.log(`Creating github user with ID: ${githubUser.id}`);
  const newUser = toGithubDbUser(githubUser);
  return pg('bloomburger_user')
    .insert(newUser)
    .returning('*')
    .then(createdUser => createdUser[0]);
};

/**
 * Retrieve a user by their bloomburger ID
 * @param {number} bloomburgerId The bloomburger user ID
 * @return {object} The user with the given bloomburger ID
 */
const retrieve = (bloomburgerId) => {
  logger.log(`Loading user with id: ${bloomburgerId}`);
  return pg('bloomburger_user')
    .where({id: bloomburgerId})
    .select()
    .then(users => isNil(users) ? null : users[0]);
};

/**
 * Updates a github user in the database
 * @param {object} githubUser The github user to update
 * @return {object} The updated user
 */
const update = githubUser => {
  logger.log(`Updating github user: ${githubUser.id}`);
  const updateUser = toGithubDbUser(githubUser);
  return pg('bloomburger_user')
    .returning()
    .where('id', '=', githubUser.id)
    .update(updateUser)
    .then(() => {
      return pg('bloomburger_user')
        .returning(['id', 'last_login'])
        .where('id', '=', githubUser.id)
        .update({id: githubUser.id})
        .then(bloomburgerUsers => bloomburgerUsers[0]);
    });
};

/**
 * Upserts a github user into the DB
 * @param {object} githubUser The github user
 * @return {object} The upserted user
 */
const upsert = githubUser => {
  console.log(JSON.stringify(githubUser, null, 2));
  return pg('bloomburger_user')
    .where({id: githubUser.id})
    .select()
    .then(user => {
      return isNil(user) || user.length <= 0 ?
        create(githubUser) :
        update(githubUser);
    });
};


export {create, retrieve, upsert};

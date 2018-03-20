import {isNil} from 'ramda';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const SECRET = fs.readFileSync('private.key');

import pg from './pg';
import logger from '../logger';

const toGithubDbUser = githubUser => ({
  id: githubUser.athlete.id,
  email_address: githubUser.athlete.email,
  first_name: githubUser.athlete.firstname,
  last_name: githubUser.athlete.lastname,
  city: githubUser.athlete.city,
  state: githubUser.athlete.state,
  country: githubUser.athlete.country,
  sex: githubUser.athlete.sex,
  photo: githubUser.athlete.profile,
  bearer_token: jwt.sign({access_token: githubUser.access_token}, SECRET)
});


/**
 * Creates a new user
 * @param {object} githubUser The github user to create in bloomburger
 * @return {object} The newly created user
 */
const create = (githubUser) => {
  logger.log(`Creating github user: ${githubUser.id}`);
  const newUser = toGithubDbUser(githubUser);
  return pg('github_user')
    .returning('id')
    .insert(newUser)
    .then(githubId => {
      return pg('bloomburger_user')
        .returning()
        .insert({github_id: Number(githubId)})
        .then(bloomburgerUser => bloomburgerUser);
    });
};

/**
 * Retrieve a user by their bloomburger ID
 * @param {number} bloomburgerId The bloomburger user ID
 * @return {object} The user with the given bloomburger ID
 */
const retrieve = (bloomburgerId) => {
  logger.log(`Loading user with id: ${bloomburgerId}`);
  return pg('bloomburger_user')
    .innerJoin('github_user', 'github_user.id', 'bloomburger_user.github_id')
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
  logger.log(`Updating github user: ${githubUser.athlete.id}`);
  const updateUser = toGithubDbUser(githubUser);
  return pg('github_user')
    .returning()
    .where('id', '=', githubUser.athlete.id)
    .update(updateUser)
    .then(() => {
      return pg('bloomburger_user')
        .returning(['id', 'github_id', 'last_login'])
        .where('github_id', '=', githubUser.athlete.id)
        .update({github_id: githubUser.athlete.id})
        .then(bloomburgerUsers => bloomburgerUsers[0]);
    });
};

/**
 * Upserts a github user into the DB
 * @param {object} githubUser The github user
 * @return {object} The upserted user
 */
const upsert = githubUser => {
  return pg('github_user')
    .where({id: githubUser.athlete.id})
    .select()
    .then(user => {
      return isNil(user) || user.length <= 0 ?
        create(githubUser) :
        update(githubUser);
    });
};


export {create, retrieve, upsert};

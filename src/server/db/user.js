import { isNil } from 'ramda';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const SECRET = fs.readFileSync('private.key');

import db from '../db';
import logger from '../logger';

/**
 * Creates a new user
 * @param {object} githubUser The github user to create in bloomburger
 * @return {object} The newly created user
 */
const create = ({ id, login, name, bio, avatar_url, access_token }) => {
  logger.log(`Creating github user with ID: ${id}`);
  const query = `
  INSERT INTO
    bloomburger_user(id, username, name, bio, photo, access_token)
  VALUES
    ($1, $2, $3, $4, $5, $6)
  RETURNING
    *;
  `;
  const signedAccessToken = jwt.sign({ access_token: access_token }, SECRET);
  return db.query(query, [id, login, name, bio, avatar_url, signedAccessToken])
    .then(res => res.rows[0]);
};

/**
 * Retrieve a user by their bloomburger ID
 * @param {number} bloomburgerId The bloomburger user ID
 * @return {object} The user with the given bloomburger ID
 */
const retrieve = bloomburgerId => {
  logger.log(`Loading user with id: ${bloomburgerId}`);
  const query = `
  SELECT
    bu.*
  FROM
    bloomburger_user bu
  WHERE
    bu.id = $1;
  `;
  return db.query(query, [bloomburgerId])
    .then(res => isNil(res.rows) ? null : res.rows[0]);
};

/**
 * Updates a github user in the database
 * @param {object} githubUser The github user to update
 * @return {object} The updated user
 */
const update = ({ id, login, name, bio, avatar_url, access_token }) => {
  logger.log(`Updating github user: ${id}`);
  const query = `
  UPDATE
    bloomburger_user
  SET 
    username = $2,
    name = $3,
    bio = $4,
    photo = $5,
    access_token = $6,
    last_login = now()
  WHERE
    id = $1
  RETURNING
    *;
  `;
  const signedAccessToken = jwt.sign({ access_token: access_token }, SECRET);
  return db.query(query, [id, login, name, bio, avatar_url, signedAccessToken])
    .then(res => res.rows[0]);
};

/**
 * Upserts a github user into the DB
 * @param {object} githubUser The github user
 * @return {object} The upserted user
 */
const upsert = githubUser => {
  return retrieve(githubUser.id)
    .then(existingUser => {
      return isNil(existingUser) ? create(githubUser) : update(githubUser);
    });
};


export { create, retrieve, upsert };

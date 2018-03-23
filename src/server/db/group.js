import { isNil } from 'ramda';
import db from '../db';
import logger from '../logger';

const joinGroup = (bloomburgerUserId, groupId) => {
  logger.log(`Add user with id: ${bloomburgerUserId} to group with id: ${groupId}`);
  const query = `
  INSERT INTO
    group_x_user (group_id, user_id)
  VALUES
    ($1, $2);
  `;

  return db.query(query, [groupId, bloomburgerUserId]);
};

const leaveGroup = (bloomburgerUserId, groupId) => {
  logger.log(`Removing user with id: ${bloomburgerUserId} from group with id: ${groupId}`);
  const query = `
  DELETE FROM
    group_x_user
  WHERE
    group_id = ? AND
    user_id = ?;
  `;

  return db.query(query, [groupId, bloomburgerUserId]);
};

const createAndJoin = (bloomburgerUserId, { name, description }) => {
  logger.log(`Creating group for user with id: ${bloomburgerUserId}`);
  const query = `
  INSERT INTO
    bloomburger_group(name, description)
  VALUES
    ($1, $2)
  RETURNING
    *;
  `;

  return db.query(query, [name, description])
    .then(res => {
      const group = res.rows[0];
      logger.log(`Created group with id: ${group.id}`);
      return joinGroup(bloomburgerUserId, group.id)
        .then(() => group);
    });
};

const retrieveAll = (bloomburgerUserId, limit, offset) => {
  logger.log(`Loading groups by request from user with id: ${bloomburgerUserId}`);
  const query = `
  SELECT
    bg.name,
    bg.description,
    bg.created_dt,
    CASE WHEN gxu.user_id IS NULL THEN false ELSE true END AS is_member
  FROM
    bloomburger_group bg
    LEFT OUTER JOIN group_x_user gxu ON gxu.group_id = bg.id;
  `;
  return db.query(query)
    .then(res => isNil(res.rows) ? [] : res.rows);
};

export { createAndJoin, joinGroup, leaveGroup, retrieveAll };

import { isNil } from 'ramda';
import db from 'server/db';
import logger from 'server/logger';

/**
 * Retrieve paginated blogs for the given user
 * @param {number} bloomburgerUserId The bloomburger user ID
 * @return {array} The blogs for this user or an empty array if none exist
 */
const retrieveAllForUser = (bloomburgerUserId, limit, offset) => {
  logger.log(`Loading blogs for user with id: ${bloomburgerUserId}`);
  const query = `
  SELECT
    b.*,
    bu.username as author
  FROM blog b
    INNER JOIN user_x_blog uxb ON uxb.blog_id = b.id
    INNER JOIN bloomburger_user bu on bu.id = b.created_by
  WHERE
    uxb.user_id = $1
  LIMIT $2
  OFFSET $3;
  `;
  return db.query(query, [bloomburgerUserId, limit, offset])
    .then(res => isNil(res.rows) ? [] : res.rows);
};


export { retrieveAllForUser };

import { isNil } from 'ramda';
import pg from './pg';
import logger from '../logger';

/**
 * Retrieve paginated blogs for the given user
 * @param {number} bloomburgerUserId The bloomburger user ID
 * @return {array} The blogs for this user or an empty array if none exist
 */
const retrieveAllForUser = (bloomburgerUserId, limit, offset) => {
  logger.log(`Loading blogs for user with id: ${bloomburgerUserId}`);
  return pg('blog')
    .join('user_x_blog', 'user_x_blog.blog_id', '=', 'blog.id')
    .join('bloomburger_user', 'bloomburger_user.id', '=', 'blog.created_by')
    .select('blog.*', 'bloomburger_user.username as author')
    .where('user_x_blog.user_id', "=", bloomburgerUserId)
    .limit(limit)
    .offset(offset)
    .then(blogs => isNil(blogs) ? [] : blogs);
};


export { retrieveAllForUser };

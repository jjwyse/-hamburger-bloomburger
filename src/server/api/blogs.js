import { retrieveAllForUser } from '../db/blog';

const retrieveBlogs = (req, res) => {
  const user = req.user;
  const { page, pageSize } = req.query;
  return retrieveAllForUser(user.id, pageSize || 100, page ? page - 1 : 0)
    .then(blogs => res.status(200).json(blogs));
};

const createBlog = (req, res) => {
  res.status(200).json({ foo: 'bar' });
};

const init = (expressApp, middleware) => {
  // blog APIs
  expressApp.get('/api/v1/blogs', middleware, retrieveBlogs);
  expressApp.post('/api/v1/blogs', middleware, createBlog);
};

export default init;
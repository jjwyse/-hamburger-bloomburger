
import { retrieveAll } from '../db/group';

const retrieveGroups = (req, res) => {
  const user = req.user;
  const { page, pageSize } = req.query;
  return retrieveAll(user.id, pageSize || 100, page ? page - 1 : 0)
    .then(blogs => res.status(200).json(blogs));
};

const init = (expressApp, middleware) => {
  // group APIs
  expressApp.get('/api/v1/groups', middleware, retrieveGroups);
};

export default init;
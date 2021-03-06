import { HTTP_REQUEST } from 'state/types';

/* Constants */
export const CREATED = 'BLOGS:CREATED';
export const LOADED = 'BLOGS:LOADED';

/* Actions */
const createBlog = blog => ({
  [HTTP_REQUEST]: {
    method: 'POST',
    endpoint: '/blogs',
    payload: blog,
    types: [CREATED],
    message: 'Creating blog...',
  },
});

const loadBlogs = () => ({
  [HTTP_REQUEST]: {
    method: 'GET',
    endpoint: '/blogs',
    types: [LOADED],
    message: 'Loading blogs...',
  },
});

/* Reducer */
const initialState = { loaded: false, all: [] };
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADED:
      return { ...state, loaded: true, all: payload };
    default:
      return state;
  }
};

export { reducer, createBlog, loadBlogs };

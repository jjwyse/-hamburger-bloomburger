import {CALL_API} from 'state/types';

/* Constants */
export const LOADED = 'BLOGS:LOADED';

/* Actions */
const loadBlogs = () => {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: '/blogs',
      types: [LOADED],
      message: 'Loading blogs...',
    },
  };
};

/* Reducer */
const initialState = {loaded: false, all: []};
const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOADED:
      return {...state, loaded: true, all: payload};
    default:
      return state;
  }
};

export {reducer, loadBlogs};

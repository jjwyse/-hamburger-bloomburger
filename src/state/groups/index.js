import { HTTP_REQUEST } from 'state/types';

/* Constants */
export const LOADED = 'GROUPS:LOADED';

/* Actions */
const loadGroups = () => ({
  [HTTP_REQUEST]: {
    method: 'GET',
    endpoint: '/groups',
    types: [LOADED],
    message: 'Loading groups...',
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

export { reducer, loadGroups };

import React from 'react';
import PropTypes from 'prop-types';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import routes from 'routes';

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.any,
  history: PropTypes.any,
};

export default Root;

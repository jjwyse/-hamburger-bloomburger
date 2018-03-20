import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import Root from 'root';
import createStore from 'state';

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}

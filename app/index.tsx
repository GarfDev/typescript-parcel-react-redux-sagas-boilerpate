/**
 * index.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import ReactDOM from 'react-dom'
import App from "./containers/App"
import configureStore from './configureStore';
import history from './utils/history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history);
let MOUNT_NODE = document.getElementById('root') as HTMLElement;

const render = (Component = App) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>, 
    MOUNT_NODE
  )
}

declare const module: any;
if (module.hot) {
  module.hot.accept(['./i18n', './containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // tslint:disable-next-line:max-line-length
    const App = require('./containers/App').default; // https://github.com/webpack/webpack-dev-server/issues/100
    render(App);
  });
}
// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')])) // eslint-disable-line prettier/prettier
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

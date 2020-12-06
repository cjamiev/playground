import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from 'store';
import App from './app/App';
import 'assets/main.css';
import 'assets/reset.css';

const store = configureStore();
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  MOUNT_NODE
);

import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import LocaleProvider from './containers/LocaleProvider';
import Main from './components/Main';
import configureStore, { history } from './store/configureStore';
import { translationMessages } from './i18n';
import './styles/styles.scss';
import './favicon.ico';

const store = configureStore();
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <LocaleProvider messages={translationMessages}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </LocaleProvider>
    </Provider>
  </AppContainer>,
  MOUNT_NODE
);

if (module.hot) {
  module.hot.accept(['./i18n', './Components/Main'], () => {
    const NewMain = Main.default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <LocaleProvider messages={translationMessages}>
            <ConnectedRouter history={history}>
              <NewMain />
            </ConnectedRouter>
          </LocaleProvider>
        </Provider>
      </AppContainer>,
      MOUNT_NODE
    );
  });
}
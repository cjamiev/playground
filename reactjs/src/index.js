import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import LanguageProvider from './containers/LanguageProvider';
import Main from './Components/Main';
import configureStore, { history } from './store/configureStore';
import { translationMessages } from './i18n';
import './styles/styles.scss';
import './favicon.ico';

const store = configureStore();
const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </LanguageProvider>
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
          <LanguageProvider messages={translationMessages}>
            <ConnectedRouter history={history}>
              <NewMain />
            </ConnectedRouter>
          </LanguageProvider>
        </Provider>
      </AppContainer>,
      MOUNT_NODE
    );
  });
}
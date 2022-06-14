import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import Routes from 'routes/Routes';
import Global from 'components/molecules/Global';
import Navigation from './Navigation';
import { SCMainLayout } from './styles';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Global />
        <SCMainLayout>
          <Navigation />
          <Routes />
        </SCMainLayout>
      </HashRouter>
    </Provider>
  );
}

export default App;

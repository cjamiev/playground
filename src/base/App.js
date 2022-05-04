import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import Routes from 'routes/Routes';
import Global from 'components/global';
import Navigation from './Navigation';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Global />
        <Navigation />
        <Routes />
      </HashRouter>
    </Provider>
  );
}

export default App;

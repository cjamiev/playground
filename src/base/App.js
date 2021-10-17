import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import Routes from 'routes/Routes';
import Navigation from 'components/navigation';
import Global from 'components/global';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navigation />
        <Global />
        <Routes />
      </HashRouter>
    </Provider>
  );
}

export default App;

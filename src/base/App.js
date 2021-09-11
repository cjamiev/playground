import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import { GlobalModal } from 'components/modal/GlobalModal';
import Routes from 'routes/Routes';
import Navigation from 'components/navigation';
import Global from 'components/global';
import 'assets/main.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Global />
        <Navigation />
        <GlobalModal />
        <Routes />
      </HashRouter>
    </Provider>
  );
}

export default App;

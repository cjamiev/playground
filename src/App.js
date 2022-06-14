import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import AppRouter from 'components/router';
import Global from 'components/molecules/Global';
import Navigation from 'components/atoms/Navigation';
import styled from 'styled-components';

const SCMainLayout = styled.div`
  display: flex;
  width: 100%;
`;

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Global />
        <SCMainLayout>
          <Navigation />
          <AppRouter />
        </SCMainLayout>
      </HashRouter>
    </Provider>
  );
}

export default App;

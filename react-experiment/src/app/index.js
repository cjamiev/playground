import React from 'react';

import { GlobalModal } from 'components/modal/GlobalModal';
import Routes from 'routes/Routes';
import Navigation from './Navigation';

function App() {
  return (
    <>
      <Navigation />
      <GlobalModal />
      <Routes />
    </>
  );
}

export default App;

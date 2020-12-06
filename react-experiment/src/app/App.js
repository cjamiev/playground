import React from 'react';

import { Modal } from 'components/Modal';
import Routes from 'routes/Routes';
import Navigation from './Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Modal />
      <Routes />
    </>
  );
}

export default App;

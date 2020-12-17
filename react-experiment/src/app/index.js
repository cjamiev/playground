import React from 'react';

import { Modal } from 'components/modal/Modal';
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

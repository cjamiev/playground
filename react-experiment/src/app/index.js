import React from 'react';

import { GlobalModal } from 'components/modal/GlobalModal';
import { LoadingModal } from 'components/modal/LoadingModal';
import Routes from 'routes/Routes';
import Navigation from 'components/navigation';

function App() {
  return (
    <>
      <Navigation />
      <GlobalModal />
      <LoadingModal />
      <Routes />
    </>
  );
}

export default App;

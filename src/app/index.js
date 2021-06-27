import React from 'react';

import { GlobalModal } from 'components/modal/GlobalModal';
import Routes from 'routes/Routes';
import Navigation from 'components/navigation';

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

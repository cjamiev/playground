import React, { useState } from 'react';

import Page from 'components/layout';

const Home = () => {
  const [error, setError] = useState('');

  return (
    <Page title={'Home'} error={error} />
  );
};

export default Home;

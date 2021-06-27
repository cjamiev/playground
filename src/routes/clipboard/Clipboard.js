import React, { useState } from 'react';
import Page from 'components/layout';
import List from 'components/list';

const Clipboard = () => {
  const [error, setError] = useState('');

  return (
    <Page title={'Clipboard'} error={error}>
      <List header='' data={[]} />
    </Page>
  );
};

export default Clipboard;

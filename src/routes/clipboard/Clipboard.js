import React, { useState } from 'react';
import Page from 'components/layout';
import List from 'components/list';

const testData = [
  [
    {
      'type': 'link',
      'label': 'cjamiev/playground ',
      'value': 'https://github.com/cjamiev/playground'
    },
    {
      'type': 'link',
      'label': ' Test Page',
      'value': 'http://localhost:1000/index.html'
    }
  ],
  [
    {
      'type': 'text',
      'value': 'testing123'
    }
  ],
  [
    {
      'type': 'copy',
      'label': 'username',
      'value': 'cjamiev1836'
    }
  ]
];

const Clipboard = () => {
  const [error, setError] = useState('');

  return (
    <Page title={'Clipboard'} error={error}>
      <List header='test header' data={testData} />
    </Page>
  );
};

export default Clipboard;

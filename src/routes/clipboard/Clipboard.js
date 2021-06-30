import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadClipboard } from './clipboardActions';
import Page from 'components/layout';
import List from 'components/list';

const Clipboard = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const clipboard = useSelector(state => state.clipboard.value);

  useEffect(() => {
    dispatch(loadClipboard());
  }, [dispatch]);

  const renderLists = clipboard.map(entry => {
    return <List key={entry.listTitle} header={entry.listTitle} data={entry.listData} />;
  });

  return (
    <Page title={'Clipboard'} error={error}>
      {renderLists}
    </Page>
  );
};

export default Clipboard;

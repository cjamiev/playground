import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPassword } from './clipboardActions';
import Page from 'components/layout';
import List from 'components/list';
import './clipboard.css';

const Clipboard = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const passwords = useSelector(state => state.clipboard.passwords);

  useEffect(() => {
    dispatch(loadPassword());
  }, [dispatch]);

  const renderLists = passwords.map(entry => {
    return <List key={entry.listTitle} header={entry.listTitle} data={entry.listData} />;
  });

  return (
    <Page title={'Clipboard'} error={error}>
      <div className="clipboard__container">
        {renderLists}
      </div>
    </Page>
  );
};

export default Clipboard;

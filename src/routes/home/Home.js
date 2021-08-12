import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './homeActions';
import { createAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Button from 'components/button';
import TextArea from 'components/form/TextArea';

const Home = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { directory, file, error, result } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if(error.message) {
      dispatch(createAlert({ content: error.message, status: 'error' }));
    }
    if(result.message) {
      dispatch(createAlert({ content: result.message, status: 'success' }));
    }
  }, [dispatch, error.message, result.message]);

  useEffect(() => {
    setContent(file);
  }, [file]);

  const directoryFilesName = directory.filter(item => item.includes('.')).map(item => {
    return <Button key={item} label={item} onClick={() => { setName(item); dispatch(loadFile(item));}} />;
  });

  return (<Page>
    {directoryFilesName}
    <TextArea selected={content} onChange={({ selected }) => { setContent(selected); }}/>
    <Button label='Save' onClick={() => { dispatch(writeFile(name, content));}} />;
  </Page>);
};

export default Home;

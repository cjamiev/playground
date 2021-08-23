import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './homeActions';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Button from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import Switch from 'components/switch';
import { copyToClipboard } from 'helper/copy';
import { sortByDelimiter, sortDescendingByDelimiter } from 'sort';
import { isJSONString } from 'type-check';
import HomeFooter from './HomeFooter';
import './home.css';

const ZERO = 0;
const ONE = 1;
const DELIMITER_TYPES = [
  { label:'comma', value: ',', selected: true },
  { label:'space', value: ' ', selected: false },
  { label:'new line', value: '\n', selected: false }
];

const Home = () => {
  const today = new Date();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [delimiters, setDelimiters] = useState(DELIMITER_TYPES);
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
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

  const selectedDelimiter = delimiters.find(item => item.selected);

  return (
    <Page
      sidePanelContent={<div>{directoryFilesName}</div>}
      footerComponent={HomeFooter()}
    >
      <div className="home__btns">
        <Text placeholder='Enter File Name' selected={name} onChange={({selected}) => { setName(selected); }} />
        <Button label='Save' onClick={() => {
          if(name && content) {
            dispatch(writeFile(name, content));
          }
        }} />
        <Button label='Copy' onClick={() => { copyToClipboard(content); }} />
        <Button label='Validate' onClick={() => {
          dispatch(dismissAlert());
          const isValid = isJSONString(content);
          const message = isValid ? 'Is Valid JSON' : 'Is NOT Valid JSON';
          const status = isValid ? 'success' : 'error';
          dispatch(createAlert({ content: message, status }));
        }} />
        <Button label='Sort Asc' onClick={() => { setContent(sortByDelimiter(content, selectedDelimiter.value)); }} />
        <Button label='Sort Desc' onClick={() => { setContent(sortDescendingByDelimiter(content, selectedDelimiter.value)); }} />
        <Button label='Split' onClick={() => { setContent(content.split(selectedDelimiter.value).join('\n')); }} />
        <Button label='Join' onClick={() => { setContent(content.split('\n').join(selectedDelimiter.value)); }} />
        <Button label='Trim' onClick={() => { setContent(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' ')); }} />
        <Dropdown label={`Delimiter: ${selectedDelimiter.label}`} values={delimiters} onChange={({ values }) => { setDelimiters(values); }} />
        <Text placeholder='Text to search' selected={find} onChange={({selected}) => { setFind(selected); }} />
        <Text placeholder='Text to replace' selected={replace} onChange={({selected}) => { setReplace(selected); }} />
        <Button label='Replace All' onClick={() => {
          const regex = new RegExp(find, 'gm');
          setContent(content.replace(regex, replace));
        }} />
      </div>
      <TextArea ariaLabel='Content text area' fullPage selected={content} onChange={({ selected }) => { setContent(selected); }}/>
    </Page>
  );
};

export default Home;

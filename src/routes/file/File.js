import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './fileActions';
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
import './file.css';

const ZERO = 0;
const ONE = 1;
const DELIMITER_TYPES = [
  { label:'comma', value: ',', selected: true },
  { label:'space', value: ' ', selected: false },
  { label:'new line', value: '\n', selected: false }
];

const File = () => {
  const today = new Date();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [delimiters, setDelimiters] = useState(DELIMITER_TYPES);
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const dispatch = useDispatch();
  const { directory, file } = useSelector(state => state.file);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if(name) {
      setContent(file);
    }
  }, [name, file]);

  const directoryFilesName = directory.filter(item => item.includes('.')).map(item => {
    return <Button key={item} label={item.split('.')[ZERO]} onClick={() => { setName(item); dispatch(loadFile(item)); dispatch(dismissAlert());}} />;
  });

  const selectedDelimiter = delimiters.find(item => item.selected);

  return (
    <Page
      sidePanelContent={<div className="container--center">{directoryFilesName}</div>}
    >
      <div className="flex--horizontal">
        <div className="flex--vertical">
          <Text placeholder='Enter File Name' selected={name} onChange={({selected}) => { setName(selected); }} />
          <Button label='Save'
            classColor='primary'
            onClick={() => {
              if(name && content) {
                dispatch(writeFile(name, content));
              }
            }} />
          <Button label='Copy' classColor='primary' onClick={() => { copyToClipboard(content); }} />

        </div>
        <div className="flex--vertical">
          <Button label='Is valid JSON?'
            classColor='secondary'
            onClick={() => {
              dispatch(dismissAlert());
              const isValid = isJSONString(content);
              const message = isValid ? 'Is Valid JSON' : 'Is NOT Valid JSON';
              const status = isValid ? 'success' : 'error';
              dispatch(createAlert({ content: message, status }));
            }} />
        </div>
        <div className="flex--vertical">
          <Dropdown label='Delimiter' values={delimiters} onChange={({ values }) => { setDelimiters(values); }} />
          <Button label='Sort Asc' classColor='secondary' onClick={() => { setContent(sortByDelimiter(content, selectedDelimiter.value)); }} />
          <Button label='Sort Desc' classColor='secondary' onClick={() => { setContent(sortDescendingByDelimiter(content, selectedDelimiter.value)); }} />
        </div>
        <div className="flex--vertical">
          <Button label='Split' classColor='secondary' onClick={() => { setContent(content.split(selectedDelimiter.value).join('\n')); }} />
          <Button label='Join' classColor='secondary' onClick={() => { setContent(content.split('\n').join(selectedDelimiter.value)); }} />
          <Button label='Trim' classColor='secondary' onClick={() => { setContent(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' ')); }} />
        </div>
        <div className="flex--vertical">
          <Text placeholder='Text to search' selected={find} onChange={({selected}) => { setFind(selected); }} />
          <Text placeholder='Text to replace' selected={replace} onChange={({selected}) => { setReplace(selected); }} />
          <Button label='Replace All' classColor='secondary' onClick={() => {
            const regex = new RegExp(find, 'gm');
            setContent(content.replace(regex, replace));
          }} />
        </div>
      </div>
      <TextArea ariaLabel='Content text area' selected={content} onChange={({ selected }) => { setContent(selected); }}/>
    </Page>
  );
};

export default File;

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
import Checkbox from 'components/form/Checkbox';
import NumberRange from 'components/form/NumberRange';
import { copyToClipboard } from 'helper/copy';
import { sortByDelimiter, sortDescendingByDelimiter } from 'sort';
import { isJSONString, isNumber } from 'type-check';
import './file.css';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const DELIMITER_TYPES = [
  { label:'comma', value: ',', selected: true },
  { label:'space', value: ' ', selected: false },
  { label:'new line', value: '\n', selected: false }
];
const MODIFIER_TYPES = [
  { label: 'Global', value: 'g', selected: false },
  { label: 'Case Insensitive', value: 'i', selected: false },
  { label: 'Multiline', value: 'm', selected: false }
];

const File = () => {
  const today = new Date();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [delimiters, setDelimiters] = useState(DELIMITER_TYPES);
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [modifier, setModifier] = useState(MODIFIER_TYPES);
  const [mode, setMode] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
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

  const handleNameChange = ({selected}) => {
    const selectedFile = directory.find(item => item === selected);
    if(selectedFile) {
      dispatch(loadFile(selected));
    }
    setName(selected);
  };

  const files = directory.map(item => {
    return { label:item, value: item, selected: false };
  });

  const selectedDelimiter = delimiters.find(item => item.selected);

  const selectedModifiers = modifier.filter(item => item.selected).map(item => item.value ).join('');
  const searchExpDisplay = `/${find}/${selectedModifiers}`;
  const searchExp = new RegExp(find,selectedModifiers);

  return (
    <Page
      sidePanelContent={
        <div className="container--center">
          <Dropdown label='Delimiter' values={delimiters} onChange={({ values }) => { setDelimiters(values); }} />
          <Button label='Sort Asc' classColor='secondary' onClick={() => { setContent(sortByDelimiter(content, selectedDelimiter.value)); }} />
          <Button label='Sort Desc' classColor='secondary' onClick={() => { setContent(sortDescendingByDelimiter(content, selectedDelimiter.value)); }} />
          <Button label='Split' classColor='secondary' onClick={() => { setContent(content.split(selectedDelimiter.value).join('\n')); }} />
          <Button label='Join' classColor='secondary' onClick={() => { setContent(content.split('\n').join(selectedDelimiter.value)); }} />
          <Button label='Trim' classColor='secondary' onClick={() => { setContent(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' ')); }} />
          <Text label='Regex' selected={find} onChange={({selected}) => { setFind(selected); }} />
          <Text label='Replace' selected={replace} onChange={({selected}) => { setReplace(selected); }} />
          <NumberRange label='Substring' selected={ {start, end} } min={ZERO} max={content.length}
            onChange={({selected}) => {
              setStart(selected.start);
              setEnd(selected.end);
            }}
          />
          <Checkbox label='Select Modifier(s)' values={modifier} onChange={({values}) => { setModifier(values);}} />
          <Button classColor="primary" label={mode ? 'Revert' : 'Convert'} onClick={() => { setMode(!mode);}} />
          <Button classColor="secondary" label='Copy RegEx' onClick={() => { copyToClipboard(searchExpDisplay); }} />
        </div>
      }
    >
      <Dropdown
        label='Select an existing file'
        values={files}
        onChange={({ values }) => {
          const selectedFile = values.find(item => item.selected);
          setName(selectedFile.value);
          dispatch(loadFile(selectedFile.value));
          dispatch(dismissAlert());
        }}
      />
      <Text placeholder='Enter File Name' selected={name} onChange={handleNameChange} />
      <Button label='Save'
        classColor='primary'
        onClick={() => {
          if(name && content) {
            dispatch(writeFile(name, content));
          }
        }} />
      <Button label='Copy' classColor='primary' onClick={() => { copyToClipboard(content); }} />
      <Button label='Is valid JSON?'
        classColor='secondary'
        onClick={() => {
          dispatch(dismissAlert());
          const isValid = isJSONString(content);
          if(isValid) {
            setContent(JSON.stringify(JSON.parse(content), undefined, TWO));
          }
          const message = isValid ? 'Is Valid JSON' : 'Is NOT Valid JSON';
          const status = isValid ? 'success' : 'error';
          dispatch(createAlert({ content: message, status }));
        }} />
      <TextArea
        ariaLabel='Content text area'
        selected={!mode ? content : content.replace(searchExp, (matchedKey) => {
          const startIndex = isNumber(Number(start)) ? Number(start) : ZERO;
          const endIndex = isNumber(Number(end)) ? Number(end) : content.length;
          if(endIndex && endIndex !== content.length) {
            return matchedKey.substr(startIndex,endIndex) + replace;
          }

          return replace || '';
        })}
        onChange={({ selected }) => { setContent(selected); }}
      />
    </Page>
  );
};

export default File;

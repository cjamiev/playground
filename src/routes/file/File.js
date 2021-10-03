import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './fileActions';
import { dismissAlert } from 'components/alert/alertActions';
import FileSidePanel from './FileSidePanel';
import Page from 'components/layout';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import { ICON_TYPES } from 'constants/icon';
import { copyToClipboard } from 'helper/copy';
import './file.css';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const File = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [previous, setPrevious] = useState('');
  const dispatch = useDispatch();
  const { directory, file } = useSelector(state => state.file);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if(name) {
      setContent(file);
      setPrevious(file);
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

  return (
    <Page
      sidePanelContent={<FileSidePanel content={content} onChange={(updated => { setContent(updated);})} />}
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
      <IconButton type={ICON_TYPES.SAVE}
        onClick={() => {
          if(name && content) {
            dispatch(writeFile(name, content));
          }
        }} />
      <IconButton type={ICON_TYPES.COPY} onClick={() => { copyToClipboard(content); }} />
      <Button label='Reset' classColor='secondary' onClick={() => {setContent(previous);}} />
      <TextArea
        ariaLabel='Content text area'
        selected={content}
        onChange={({ selected }) => { setContent(selected); }}
      />
    </Page>
  );
};

export default File;

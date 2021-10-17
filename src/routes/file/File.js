import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './fileActions';
import { dismissAlert } from 'components/alert/alertActions';
import FileOperations from './FileOperations';
import RegexOperations from './RegexOperations';
import StringOperations from './StringOperations';
import JsonOperations from './JsonOperations';
import Page from 'components/layout';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import { ICON_TYPES } from 'constants/icon';
import { copyToClipboard } from 'helper/copy';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const File = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [previous, setPrevious] = useState('');
  const dispatch = useDispatch();
  const { directory, file } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if (name) {
      setContent(file);
      setPrevious(file);
    }
  }, [name, file]);

  const handleNameChange = ({ selected }) => {
    const selectedFile = directory.find((item) => item === selected);
    if (selectedFile) {
      dispatch(loadFile(selected));
    }
    setName(selected);
  };

  const files = directory.map((item) => {
    return { label: item, value: item, selected: false };
  });

  return (
    <Page>
      <div className="flex--horizontal">
        <div className="flex--one">
          <Dropdown
            label="Select an existing file"
            values={files}
            onChange={({ values }) => {
              const selectedFile = values.find((item) => item.selected);
              setName(selectedFile.value);
              dispatch(loadFile(selectedFile.value));
              dispatch(dismissAlert());
            }}
          />
          <Text placeholder="Enter File Name" selected={name} onChange={handleNameChange} />
          <IconButton
            type={ICON_TYPES.SAVE}
            onClick={() => {
              if (name && content) {
                dispatch(writeFile(name, content));
              }
            }}
          />
          <IconButton
            type={ICON_TYPES.COPY}
            onClick={() => {
              copyToClipboard(content);
            }}
          />
          <IconButton
            type={ICON_TYPES.UNDO}
            onClick={() => {
              setContent(previous);
            }}
          />
        </div>
        <div className="flex--two">
          <TextArea
            ariaLabel="Content text area"
            selected={content}
            onChange={({ selected }) => {
              setContent(selected);
            }}
          />
        </div>
        <div className="flex--three">
          <FileOperations content={content}
            onChange={(updated) => {
              setContent(updated);
            }}
          />
        </div>
      </div>
    </Page>
  );
};

export default File;

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
import useStateHistory from 'hooks/useStateHistory';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const File = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { set, back, forward } = useStateHistory((value) => { setContent(value); });
  const dispatch = useDispatch();
  const { directory, fileContent } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if (name) {
      setContent(fileContent);
    }
  }, [name, fileContent, setContent]);

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
            onClick={back}
          />
          <IconButton
            type={ICON_TYPES.REDO}
            onClick={forward}
          />
        </div>
        <div className="flex--three">
          <TextArea
            ariaLabel="Content text area"
            selected={content}
            onChange={({ selected }) => {
              setContent(selected);
              set(selected);
            }}
          />
        </div>
        <div className="flex--three">
          <FileOperations content={content}
            onChange={(updated) => {
              setContent(updated);
              set(updated);
            }}
          />
        </div>
      </div>
    </Page>
  );
};

export default File;

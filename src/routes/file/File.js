import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './fileActions';
import { dismissAlert } from 'components/alert/alertActions';
import FileOperations from './FileOperations';
import RegexOperations from './RegexOperations';
import StringOperations from './StringOperations';
import JsonOperations from './JsonOperations';
import Page from 'components/layout';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Button from 'components/button';
import { copyToClipboard } from 'helper/copy';
import { SCFileBtnWrapper, SCFileNameWrapper, SCFileBtn } from './styles';
import { SaveSVG } from 'components/icons/SaveSVG';
import { CopySVG } from 'components/icons/CopySVG';

const File = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { directory, fileContent } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if (name) {
      setContent(fileContent);
    }
  }, [name, fileContent]);

  const handleNameChange = ({ selected }) => {
    const selectedFile = directory.find((item) => item === selected);
    if (selectedFile) {
      dispatch(loadFile(selected));
    }
    setName(selected);
  };

  return (
    <Page>
      <div className="flex--horizontal">
        <SCFileBtnWrapper>
          <SCFileNameWrapper>
            <Text placeholder="Enter File Name" selected={name} onChange={handleNameChange} />
            <svg
              aria-label="Save"
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                if (name && content) {
                  dispatch(writeFile(name, content));
                }
              }}
            >
              <SaveSVG transform={'scale(0.7) translate(0,-5)'} />
            </svg>
            <svg
              aria-label="Copy"
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                copyToClipboard(content);
              }}
            >
              <CopySVG transform={'scale(0.7) translate(0,-5)'} />
            </svg>
          </SCFileNameWrapper>
          {directory.map((item) => {
            return (
              <Button
                isPrimary
                key={item}
                label={item}
                onClick={() => {
                  setName(item);
                  dispatch(loadFile(item));
                  dispatch(dismissAlert());
                }}
              />
            );
          })}
        </SCFileBtnWrapper>
        <div className="flex--three">
          <TextArea
            ariaLabel="Content text area"
            selected={content}
            onChange={({ selected }) => {
              setContent(selected);
            }}
          />
        </div>
        <div className="flex--three">
          <FileOperations
            content={content}
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

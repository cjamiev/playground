import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSnippetDirectory, loadSnippet, createSnippet, deleteSnippet } from './snippetActions';
import { copyToClipboard } from 'helper/copy';
import Button from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import { CopySVG } from 'components/icons/CopySVG';
import { TrashSVG } from 'components/icons';
import {
  SCFlexWrapper,
  SCCreateFormFieldSet,
  SCLoadHeader,
  SCLoadBtnWrapper,
  SCLoadButton,
  SCButtonGroup,
  SCSnippetTextWrapper
} from './styles';

const Snippet = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { snippets, snippetFile } = useSelector((state) => state.project);

  useEffect(() => {
    setContent(snippetFile.content);
    setName(snippetFile.name);
  }, [snippetFile]);

  const fileButtons = snippets.map((label) => {
    return (
      <SCLoadButton
        key={label}
        label={label}
        onClick={() => {
          dispatch(loadSnippet(label));
        }}
      />
    );
  });

  return (
    <SCFlexWrapper>
      <div>
        <form>
          <SCCreateFormFieldSet>
            <legend> Create Snippet </legend>
            <Text
              placeholder="Snippet Name"
              selected={name}
              onChange={({ selected }) => {
                setName(selected);
              }}
            />
            <Button
              label="Submit"
              isPrimary
              onClick={(e) => {
                e.preventDefault();
                if (name && content) {
                  dispatch(createSnippet(name, content));
                }
              }}
            />
          </SCCreateFormFieldSet>
        </form>
        <SCSnippetTextWrapper>
          <TextArea
            ariaLabel="Enter Content"
            selected={content}
            onChange={({ selected }) => {
              setContent(selected);
            }}
          />
        </SCSnippetTextWrapper>
      </div>
      <div>
        <SCLoadHeader>
          <h2>Load File</h2>
          <CopySVG
            width="45"
            onClick={() => {
              copyToClipboard(snippetFile.content);
            }}
            transform={'translate(0,4)'}
          />
          <TrashSVG
            transform="translate(0,4)"
            width="45"
            onClick={() => {
              dispatch(deleteSnippet(snippetFile.name));
            }}
          />
        </SCLoadHeader>
        <SCLoadBtnWrapper>{fileButtons}</SCLoadBtnWrapper>
      </div>
    </SCFlexWrapper>
  );
};

export default Snippet;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSnippetDirectory, loadSnippet, createSnippet, deleteSnippet } from './snippetActions';
import { copyToClipboard } from 'helper/copy';
import { ICON_TYPES } from 'constants/icon';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import { TrashSVG } from 'components/icons/TrashSVG';
import {
  SCFlexWrapper,
  SCCreateFormFieldSet,
  SCLoadHeader,
  SCLoadBtnWrapper,
  SCButtonGroup,
  SCSnippetTextWrapper
} from './styles';

const Snippet = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { snippets, snippetFile } = useSelector((state) => state.project);

  useEffect(() => {
    if (!snippets.length) {
      dispatch(loadSnippetDirectory());
    }
  }, [dispatch, snippets]);

  useEffect(() => {
    setContent(snippetFile.content);
    setName(snippetFile.name);
  }, [snippetFile]);

  const fileButtons = snippets.map((label) => {
    return (
      <Button
        key={label}
        label={label}
        className="load-file__btns"
        primary
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
              label="Create New"
              classColor="primary"
              onClick={() => {
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
          {snippetFile.name && (
            <>
              <IconButton
                type={ICON_TYPES.COPY}
                onClick={() => {
                  copyToClipboard(snippetFile.content);
                }}
              />
              <svg
                aria-label="Delete"
                width="45"
                height="53"
                viewBox="0 0 53 53"
                onClick={() => {
                  dispatch(deleteSnippet(snippetFile.name));
                }}
              >
                <TrashSVG transform={'translate(0,4)'} />
              </svg>
            </>
          )}
        </SCLoadHeader>
        <SCLoadBtnWrapper>{fileButtons}</SCLoadBtnWrapper>
      </div>
    </SCFlexWrapper>
  );
};

export default Snippet;

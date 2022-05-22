import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSnippetDirectory, loadSnippet, createSnippet } from './snippetActions';
import { copyToClipboard } from 'helper/copy';
import { ICON_TYPES } from 'constants/icon';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import { SCFlexWrapper, SCCreateFormFieldSet, SCLoadHeader, SCButtonGroup, SCSnippetTextWrapper } from './styles';

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
    setContent(snippetFile);
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
        <SCLoadHeader>
          <h2>Load File</h2>
          <IconButton
            type={ICON_TYPES.COPY}
            onClick={() => {
              copyToClipboard(snippetFile);
            }}
          />
        </SCLoadHeader>
        <SCButtonGroup>{fileButtons}</SCButtonGroup>
      </div>
      <SCSnippetTextWrapper>
        <TextArea
          ariaLabel="Enter Content"
          selected={content}
          onChange={({ selected }) => {
            setContent(selected);
          }}
        />
      </SCSnippetTextWrapper>
    </SCFlexWrapper>
  );
};

export default Snippet;

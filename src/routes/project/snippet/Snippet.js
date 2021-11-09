import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSnippetDirectory, loadSnippet, createSnippet } from './snippetActions';
import { copyToClipboard } from 'helper/copy';
import { ICON_TYPES } from 'constants/icon';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';

const Snippet = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { snippets, snippetFile } = useSelector(state => state.project);

  useEffect(() => {
    if(!snippets.length) {
      dispatch(loadSnippetDirectory());
    }
  }, [dispatch, snippets]);

  useEffect(() => {
    setContent(snippetFile);
  }, [snippetFile]);

  const fileButtons = snippets.map(label => {
    return <Button
      key={label}
      label={label}
      classColor="primary"
      onClick={() => {
        dispatch(loadSnippet(label));
      }}
    />;
  });

  return (
    <div className="flex--horizontal container--center">
      <div className="flex--vertical">
        <Text
          placeholder="Enter name"
          selected={name}
          onChange={({ selected }) => {
            setName(selected);
          }}
        />
        <Button
          label="Add"
          classColor="secondary"
          onClick={() => {
            if(name && content) {
              dispatch(createSnippet(name, content));
            }
          }}
        />
        {fileButtons}
      </div>
      <IconButton
        type={ICON_TYPES.COPY}
        onClick={() => {
          copyToClipboard(snippetFile);
        }}
      />
      <div className="snippet__file-area">
        <TextArea
          ariaLabel="Enter Contents"
          selected={content}
          onChange={({ selected }) => { setContent(selected); }}
        />
      </div>
    </div>
  );
};

export default Snippet;

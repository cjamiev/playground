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
      className="load-file__btns"
      onClick={() => {
        dispatch(loadSnippet(label));
      }}
    />;
  });

  return (
    <div className="flex--horizontal container--center">
      <div className="flex--vertical flex--one">
        <h2 className="horizontal-center">Load File</h2>
        {fileButtons}
      </div>
      <IconButton
        type={ICON_TYPES.COPY}
        onClick={() => {
          copyToClipboard(snippetFile);
        }}
      />
      <div className="project__file-area flex--three">
        <TextArea
          ariaLabel="Enter Contents"
          selected={content}
          onChange={({ selected }) => { setContent(selected); }}
        />
      </div>
      <div className="flex--vertical flex--one">
        <h2>Create Snippet</h2>
        <Text
          placeholder="Snippet Name"
          selected={name}
          onChange={({ selected }) => {
            setName(selected);
          }}
        />
        <Button
          label="Create New"
          classColor="secondary"
          onClick={() => {
            if(name && content) {
              dispatch(createSnippet(name, content));
            }
          }}
        />
      </div>
    </div>
  );
};

export default Snippet;

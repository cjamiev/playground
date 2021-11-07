import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSnippetDirectory, loadSnippet } from './snippetActions';
import { copyToClipboard } from 'helper/copy';
import { ICON_TYPES } from 'constants/icon';
import Button, { IconButton } from 'components/button';
import TextArea from 'components/form/TextArea';

const Snippet = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { snippets, snippetFile } = useSelector(state => state.project);

  useEffect(() => {
    if(!snippets.length) {
      dispatch(loadSnippetDirectory());
    }
  }, [dispatch, snippets]);

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
      <div className="flex--vertical">{fileButtons}</div>
      <IconButton
        type={ICON_TYPES.COPY}
        onClick={() => {
          copyToClipboard(snippetFile);
        }}
      />
      <div className="snippet__file-area">
        <TextArea
          ariaLabel="Select File"
          selected={snippetFile}
        />
      </div>
    </div>
  );
};

export default Snippet;

import React, { useState } from 'react';
import Button from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';

const ClipboardFormCopy = ({ onChange }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="clipboard-form" >
      <Text label='Name' selected={name} onChange={({selected}) => { setName(selected); }} />
      <TextArea label="Value" selected={content} onChange={({ selected }) => { setContent(selected); }}/>
      <Button label='Submit' classColor='primary' onClick={
        () => {
          if(name && content) {
            onChange({ name, content });
          }
        }
      } />
    </div>
  );
};

export default ClipboardFormCopy;

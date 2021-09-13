import React, { useState } from 'react';
import Button from 'components/button';
import Radio from 'components/form/Radio';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import { TYPE } from 'constants/type';

const CommandForm = ({ onChange }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [mode, setMode] = useState([{ label: 'simple', selected: true }, { label: 'detach', selected: false }, { label: 'block', selected: false }]);

  return (
    <div>
      <Text label='Name' selected={name} onChange={({selected}) => { setName(selected); }} />
      <Text label='Value' selected={value} onChange={({selected}) => { setValue(selected); }} />
      <Radio label='Mode' values={mode} onChange={({values}) => { setMode(values); }} />
      <Button label='Save' classColor='primary' onClick={
        () => {
          if(name && value) {
            const selectedMode = mode.find(item => item.selected).label;
            onChange({ name, content: { mode: selectedMode, name: value } });
            setName('');
            setValue('');
          }
        }
      } />
    </div>
  );
};

export default CommandForm;

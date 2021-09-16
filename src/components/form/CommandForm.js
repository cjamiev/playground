import React, { useState } from 'react';
import Button from 'components/button';
import Radio from 'components/form/Radio';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import { TYPE } from 'constants/type';

const CommandForm = ({ onChange }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [args, setArgs] = useState([{ label: 'Yes', value: true, selected: false }, { label: 'No', value: false, selected: true }]);

  return (
    <div>
      <Text label='Name' selected={name} onChange={({selected}) => { setName(selected); }} />
      <Text label='Command File Name' selected={value} onChange={({selected}) => { setValue(selected); }} />
      <Radio label='Show Args' values={args} onChange={({values}) => { setArgs(values); }} />
      <Button label='Save' classColor='primary' onClick={
        () => {
          if(name && value) {
            const selectedArgs = args.find(item => item.selected).value;
            onChange({ name, content: { showArgs: selectedArgs, name: value } });
            setName('');
            setValue('');
          }
        }
      } />
    </div>
  );
};

export default CommandForm;

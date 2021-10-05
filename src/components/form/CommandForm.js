import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Radio from 'components/form/Radio';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import { TYPE } from 'constants/type';

const ZERO = 0;

const CommandForm = ({ onChange }) => {
  const { commands } = useSelector((state) => state.list);
  const COMMAND_KEYS = commands.map((name) => {
    return { label: name, selected: false };
  });
  const [commandKeys, setCommandKeys] = useState(COMMAND_KEYS);
  const [name, setName] = useState('');
  const [args, setArgs] = useState([
    { label: 'Yes', value: true, selected: false },
    { label: 'No', value: false, selected: true }
  ]);

  return (
    <div>
      <Text
        label="Name"
        selected={name}
        onChange={({ selected }) => {
          setName(selected);
        }}
      />
      <Dropdown
        label="Commands"
        values={commandKeys}
        onChange={({ values }) => {
          setCommandKeys(values);
        }}
      />
      <Radio
        label="Show Args"
        values={args}
        onChange={({ values }) => {
          setArgs(values);
        }}
      />
      <Button
        label="Save"
        classColor="primary"
        onClick={() => {
          const selectedCommand = commandKeys.find((item) => item.selected);
          if (name && selectedCommand) {
            const selectedArgs = args.find((item) => item.selected).value;
            onChange({ name, content: { showArgs: selectedArgs, name: selectedCommand.label } });
            setName('');
          }
        }}
      />
    </div>
  );
};

export default CommandForm;

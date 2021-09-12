import React, { useState } from 'react';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import Text from 'components/form/Text';

const GeneratorSidePanel = ({records, onSelectRecord, onSubmit, onDelete}) => {
  const [name, setName] = useState('');

  const handleNameChange = ({selected}) => {
    setName(selected);
  };

  return (
    <div className="container--center">
      <Dropdown
        label='Select an existing record'
        values={records}
        onChange={({ values }) => {
          const selectedRecord = values.find(item => item.selected);
          onSelectRecord(selectedRecord.label);
          setName(selectedRecord.label);
        }}
      />
      <Text placeholder='Name' selected={name} onChange={handleNameChange} />
      <Button classColor='primary' label="Save" onClick={() => { onSubmit(name);}} />
      <Button classColor='primary' label="Delete" onClick={() => { onDelete(name);}} />
    </div>
  );
};

export default GeneratorSidePanel;
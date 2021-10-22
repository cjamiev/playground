import React from 'react';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import Text from 'components/form/Text';

const GeneratorSidePanel = ({ generatorRecords, selectedName, onSelectRecord, onSubmit, onDelete }) => {
  return (
    <div className="container--center">
      <Dropdown
        label="Select an existing record"
        values={generatorRecords}
        onChange={({ values }) => {
          const selectedRecord = values.find((item) => item.selected);
          onSelectRecord(selectedRecord.label);
        }}
      />
      <Text
        placeholder="Name"
        selected={selectedName}
        onChange={({ selected }) => {
          onSelectRecord(selected);
        }}
      />
      <Button
        classColor="primary"
        label="Save"
        onClick={() => {
          onSubmit(selectedName);
        }}
      />
      <Button
        classColor="primary"
        label="Delete"
        onClick={() => {
          onDelete(selectedName);
        }}
      />
    </div>
  );
};

export default GeneratorSidePanel;

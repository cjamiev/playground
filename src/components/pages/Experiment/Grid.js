import React from 'react';
import { SettingsTab } from 'components/molecules/SettingsTab';

const labels = {
  tableHeaders: [{ label: 'Description' }, { label: 'Name' }, { label: 'Delete' }],
  legend: 'Create New',
  inputLabel: 'Description',
  inputValue: 'Name'
};

const Grid = () => {
  return (
    <SettingsTab
      settingsData={[{ label: 'one', value: '1' }]}
      labels={labels}
      onClick={() => {
        console.log('hit');
      }}
      isHidden={true}
    />
  );
};

export default Grid;

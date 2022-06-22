import React from 'react';
import Page from 'components/layout/Page';
import MultiDropdown from 'components/atoms/MultiDropdown';

const data = [
  {
    label: 'A',
    values: ['One', 'Two', 'Three']
  },
  {
    label: 'B',
    values: ['1', '2', '3']
  }
];

const DropdownPage = () => {
  return (
    <Page>
      <MultiDropdown data={data} />
    </Page>
  );
};

export default DropdownPage;

import React from 'react';
import Page from 'components/layout/Page';
import MultiDropdown from 'components/atoms/MultiDropdown';
import Dropdown from 'components/atoms/Dropdown';

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
      <Dropdown label={'label'} header={'header'} body={'body'} footer={'footer'} />
    </Page>
  );
};

export default DropdownPage;

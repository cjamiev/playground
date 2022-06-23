import React from 'react';
import Page from 'components/layout/Page';
import CollapsedList from 'components/atoms/CollapsedList';

const collapseListData = [
  {
    shortLabel: '1',
    label: 'Item1',
    handleClick: () => {
      console.log('Item1');
    },
    isActive: false
  },
  {
    shortLabel: '2',
    label: 'Item2',
    handleClick: () => {
      console.log('Item2');
    },
    isActive: true
  },
  {
    shortLabel: '3',
    label: 'Item3',
    handleClick: () => {
      console.log('Item3');
    },
    isActive: false
  }
];

const ListPage = () => {
  return (
    <Page>
      <CollapsedList data={collapseListData} />
    </Page>
  );
};

export default ListPage;

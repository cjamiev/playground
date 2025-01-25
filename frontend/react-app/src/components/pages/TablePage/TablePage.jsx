import React from 'react';
import Page from '../../layout/Page';
import BorderlessTable from '../../atoms/BorderlessTable';
import FilledTable from '../../atoms/FilledTable';
import StandardTable from '../../atoms/StandardTable';

const labels = {
  tableHeaders: [{ label: 'Description' }, { label: 'Name' }, { label: 'Delete' }],
  legend: 'Create New',
  inputLabel: 'Description',
  inputValue: 'Name'
};

const borderlessTableData = {
  tableHeaders: [{ label: 'Username' }, { label: '31jdt6kc6be45xgx736xfmqik7fe' }],
  tableBody: [
    { label: 'Email', value: 'cjamiev@gmail.com' },
    { label: 'Date of birth', value: 'March 18, 1988' },
    { label: 'Country or region', value: 'USA' }
  ]
};

const filledTableData = {
  tableHeaders: [{ label: 'Most Played' }, { label: 'Players Now' }, { label: 'Peak Today' }],
  tableBody: [
    { label: 'Lost Ark', value: '381,654', value2: '462,085' },
    { label: 'Counter-Strike: Global Offensive', value: '369,336', value2: '850,323' }
  ]
};

const TablePage = () => {
  return (
    <Page>
      <h2> Standard Table </h2>
      <StandardTable
        data={[{ label: 'one', value: '1' }]}
        labels={labels}
        onClick={() => {
          console.log('hit');
        }}
        isHidden={true}
      />

      <h2> Borderless Table </h2>
      <BorderlessTable tableHeaders={borderlessTableData.tableHeaders} tableBody={borderlessTableData.tableBody} />

      <h2> Filled Table </h2>
      <FilledTable tableHeaders={filledTableData.tableHeaders} tableBody={filledTableData.tableBody} />
    </Page>
  );
};

export default TablePage;

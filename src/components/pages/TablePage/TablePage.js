import React from 'react';
import Page from 'components/layout/Page';
import BorderlessTable from 'components/atoms/BorderlessTable';
import StandardTable from 'components/atoms/StandardTable';

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
    </Page>
  );
};

export default TablePage;

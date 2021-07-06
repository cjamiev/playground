import React from 'react';
import Alert from 'components/alert';

const PageHeader = ({ title }) => {
  return (
    <header className="pageheader">
      <h1 className="pageheader__title">{title}</h1>
      <Alert />
    </header>
  );
};

export default PageHeader;
import React from 'react';
import Alert from 'components/alert';

const PageHeader = ({ title, error }) => {
  return (
    <header className="pageheader">
      <h1 className="pageheader__title">{title}</h1>
      <Alert content={error} status='error'/>
    </header>
  );
};

export default PageHeader;
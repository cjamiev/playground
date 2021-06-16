import React from 'react';

const PageHeader = ({ title, error }) => {
  return (
    <header className="pageheader">
      {error && <div className="pageheader__error">{error}</div>}
      <h1>{title}</h1>
    </header>
  );
};

export default PageHeader;
import React from 'react';

const PageHeader = ({ title, error }) => {
  return (
    <header>
      <h1>{title}</h1>
      {error && <span>error</span>}
    </header>
  );
};

export default PageHeader;
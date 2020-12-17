import React from 'react';

const PageHeader = ({ title, error }) => {
  return (
    <header>
      <h1>{title}</h1>
      {error && <span>error</span>}
    </header>
  );
};

const PageContent = ({ children }) => {
  return <div className="page-body">{children}</div>;
};

const footerStyle = {
  position: 'absolute',
  height: '50px',
  top: 'calc(100% - 50px)'
};

const PageFooter = () => {
  return (
    <footer style={footerStyle}>Footer</footer>
  );
};

const Page = ({ title, error, children }) => {
  return (
    <div className="page">
      <PageHeader title={title} error={error} />
      <PageContent>{children}</PageContent>
      <PageFooter />
    </div>
  );
};

export default Page;
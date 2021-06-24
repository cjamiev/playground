import React from 'react';

import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import './page.css';

const Page = ({ title, error, children, footerComponent }) => {
  return (
    <div className="page">
      <PageHeader title={title} error={error} />
      <PageContent>{children}</PageContent>
      {footerComponent && <PageFooter> {footerComponent} </PageFooter>}
    </div>
  );
};

export default Page;
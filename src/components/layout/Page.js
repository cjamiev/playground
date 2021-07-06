import React from 'react';

import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import './page.css';

const Page = ({ children, footerComponent }) => {
  return (
    <div className="page">
      <PageHeader />
      <PageContent>{children}</PageContent>
      {footerComponent && <PageFooter> {footerComponent} </PageFooter>}
    </div>
  );
};

export default Page;
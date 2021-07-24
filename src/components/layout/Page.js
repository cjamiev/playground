import React, { useState } from 'react';

import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import './page.css';

const Page = ({ sidePanelContent, children, footerComponent }) => {
  const [showSidePanel, setShowSidePanel] = useState(false);

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };

  const hasSidePanelContent = !!sidePanelContent;

  return (
    <div className="page">
      {showSidePanel && <div className="page__sidepanel">{sidePanelContent}</div>}
      <div className="page__rightside">
        <PageHeader toggleSidePanel={toggleSidePanel} hasSidePanelContent={hasSidePanelContent}/>
        <PageContent>{children}</PageContent>
        {footerComponent && <PageFooter> {footerComponent} </PageFooter>}
      </div>
    </div>
  );
};

export default Page;
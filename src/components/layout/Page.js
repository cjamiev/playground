import React, { useState } from 'react';
import Button from 'components/button';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import SidePanel from './SidePanel';
import './page.css';

const Page = ({ sidePanelContent, isSidePanelWide, children, footerComponent }) => {
  const [showSidePanel, setShowSidePanel] = useState(false);

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };

  const hasSidePanelContent = !!sidePanelContent;
  const mainClassName = isSidePanelWide && showSidePanel ? 'page__main page__main--hide' : 'page__main';

  return (
    <div className="page">
      <SidePanel
        showSidePanel={showSidePanel}
        sidePanelContent={sidePanelContent}
        isSidePanelWide={isSidePanelWide}
        toggleSidePanel={toggleSidePanel}
      />
      <div className={mainClassName}>
        <PageHeader
          toggleSidePanel={toggleSidePanel}
          hasSidePanelContent={hasSidePanelContent}
        />
        <PageContent>{children}</PageContent>
        <PageFooter> {footerComponent} </PageFooter>
      </div>
    </div>
  );
};

export default Page;
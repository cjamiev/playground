import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import Button from 'components/button';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import SidePanel from './SidePanel';
import './page.css';

const NAV_ITEMS = Object.values(ROUTES);

const Page = ({ sidePanelContent, isSidePanelWide, children, footerComponent }) => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const history = useHistory();
  const currentPage = NAV_ITEMS.find(item => item.url === history.location.pathname);

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
        title={currentPage.sidePanelLabel}
      />
      <div className={mainClassName}>
        <PageHeader
          toggleSidePanel={toggleSidePanel}
          hasSidePanelContent={hasSidePanelContent}
          title={currentPage.label}
        />
        <PageContent>{children}</PageContent>
        <PageFooter> {footerComponent} </PageFooter>
      </div>
    </div>
  );
};

export default Page;
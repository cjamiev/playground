import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import Button from 'components/button';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import SidePanel from './SidePanel';
import { openSidePanel, closeSidePanel } from 'components/global/globalActions';
import './page.css';

const NAV_ITEMS = Object.values(ROUTES);

const Page = ({ sidePanelContent, isSidePanelWide, children, footerComponent }) => {
  const dispatch = useDispatch();
  const { isSidePanelOpen } = useSelector((state) => state.global);
  const history = useHistory();
  const currentPage = NAV_ITEMS.find((item) => item.url === history.location.pathname);

  const toggleSidePanel = () => {
    if (isSidePanelOpen) {
      dispatch(closeSidePanel());
    } else {
      dispatch(openSidePanel());
    }
  };

  const hasSidePanelContent = !!sidePanelContent;
  const mainClassName = isSidePanelWide && isSidePanelOpen ? 'page__main page__main--hide' : 'page__main';

  return (
    <div className="page scrollbar">
      <SidePanel
        showSidePanel={isSidePanelOpen}
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

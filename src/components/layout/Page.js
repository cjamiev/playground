import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import Button from 'components/button';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import QuickAccess from './QuickAccess';
import SidePanel from './SidePanel';
import { openSidePanel, closeSidePanel } from 'components/global/globalActions';
import { TIME } from 'constants/time';
import { SCLayout, SCPageWrapper, SCPageContent } from './styles';

const NAV_ITEMS = Object.values(ROUTES);

const Page = ({ sidePanelContent, isSidePanelWide, children, footerComponent }) => {
  const dispatch = useDispatch();
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const { isSidePanelOpen } = useSelector((state) => state.global);
  const location = useLocation();
  const currentPage = NAV_ITEMS.find((item) => item.url === location.pathname);
  const hasSidePanelContent = !!sidePanelContent;

  const toggleSidePanel = () => {
    if (isSidePanelOpen) {
      setIsTransitioningOut(true);
      setTimeout(() => {
        dispatch(closeSidePanel());
        setIsTransitioningOut(false);
      }, TIME.A_SECOND);
    } else {
      dispatch(openSidePanel());
    }
  };

  return (
    <SCLayout>
      {isSidePanelOpen && (
        <SidePanel
          isTransitioningOut={isTransitioningOut}
          sidePanelContent={sidePanelContent}
          isSidePanelWide={isSidePanelWide}
          toggleSidePanel={toggleSidePanel}
          title={currentPage.sidePanelLabel}
        />
      )}
      <SCPageWrapper>
        <PageHeader
          toggleSidePanel={toggleSidePanel}
          hasSidePanelContent={hasSidePanelContent}
          title={currentPage.label}
        />
        <div>{children}</div>
        <QuickAccess />
      </SCPageWrapper>
    </SCLayout>
  );
};

export default Page;

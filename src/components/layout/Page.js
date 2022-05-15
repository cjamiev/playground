import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import Button from 'components/button';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import SidePanel from './SidePanel';
import { openSidePanel, closeSidePanel } from 'components/global/globalActions';
import { TIME } from 'constants/time';
import { SCLayout, SCPageWrapper } from './styles';

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
      setTimeout(() => { dispatch(closeSidePanel()); }, TIME.A_SECOND);
      setIsTransitioningOut(true);
    } else {
      dispatch(openSidePanel());
      setIsTransitioningOut(false);
    }
  };

  return (
    <SCLayout>
      {isSidePanelOpen &&
        <SidePanel
          isTransitioningOut={isTransitioningOut}
          sidePanelContent={sidePanelContent}
          isSidePanelWide={isSidePanelWide}
          toggleSidePanel={toggleSidePanel}
          title={currentPage.sidePanelLabel}
        />
      }
      <SCPageWrapper isSideBarFullSize={isSidePanelWide}>
        <PageHeader
          toggleSidePanel={toggleSidePanel}
          hasSidePanelContent={hasSidePanelContent}
          title={currentPage.label}
        />
        <PageContent>{children}</PageContent>
        <PageFooter />
      </SCPageWrapper>
    </SCLayout>
  );
};

export default Page;

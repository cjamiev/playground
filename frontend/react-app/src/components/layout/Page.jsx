import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import PageHeader from './PageHeader';
import SidePanel from './SidePanel';
import { openSidePanel, closeSidePanel } from '../molecules/Global/globalActions';
import { TIME } from '../../constants/time';
import { SCLayout, SCPageWrapper, SCPage } from './styles';
import Navigation from './Navigation';

const NAV_ITEMS = Object.values(ROUTES);
const ErrorPage = { label: 'Page Not Found' };

const Page = ({ sidePanelContent, isSidePanelWide, children, footerComponent }) => {
  const dispatch = useDispatch();
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const { isSidePanelOpen } = useSelector((state) => state.global);
  const location = useLocation();
  const currentPage = NAV_ITEMS.find((item) => item.url === location.pathname) || ErrorPage;
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
      <Navigation />
      <SCPageWrapper>
        {isSidePanelOpen && (
          <SidePanel
            isTransitioningOut={isTransitioningOut}
            sidePanelContent={sidePanelContent}
            isSidePanelWide={isSidePanelWide}
            toggleSidePanel={toggleSidePanel}
            title={currentPage.sidePanelLabel}
          />
        )}
        <SCPage>
          <PageHeader
            toggleSidePanel={toggleSidePanel}
            hasSidePanelContent={hasSidePanelContent}
            title={currentPage.label}
          />
          <div>{children}</div>
        </SCPage>
      </SCPageWrapper>
    </SCLayout>
  );
};

export default Page;

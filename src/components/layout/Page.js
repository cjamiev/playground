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

const NAV_ITEMS = Object.values(ROUTES);
const ONE_SECOND = 1000;

const Page = ({ sidePanelContent, isSidePanelWide, children, footerComponent }) => {
  const dispatch = useDispatch();
  const [sidePanelAnimation, setSidePanelAnimation] = useState('sidepanel--animate-in');
  const { isSidePanelOpen } = useSelector((state) => state.global);
  const history = useHistory();
  const currentPage = NAV_ITEMS.find((item) => item.url === history.location.pathname);

  const toggleSidePanel = () => {
    if (isSidePanelOpen) {
      setSidePanelAnimation('sidepanel--animate-out');
      setTimeout(() => { dispatch(closeSidePanel()); }, ONE_SECOND);
    } else {
      setSidePanelAnimation('sidepanel--animate-in');
      dispatch(openSidePanel());
    }
  };

  const hasSidePanelContent = !!sidePanelContent;
  const mainClassName = isSidePanelWide && isSidePanelOpen ? 'page__main page__main--hide' : 'page__main';

  return (
    <div className="page scrollbar">
      {isSidePanelOpen &&
        <SidePanel
          animation={sidePanelAnimation}
          sidePanelContent={sidePanelContent}
          isSidePanelWide={isSidePanelWide}
          toggleSidePanel={toggleSidePanel}
          title={currentPage.sidePanelLabel}
        />
      }
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

import React, { useState } from 'react';
import Button from 'components/button';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import './page.css';

const Page = ({ sidePanelContent, isSidePanelWide, children, footerComponent }) => {
  const [showSidePanel, setShowSidePanel] = useState(false);

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };

  const hasSidePanelContent = !!sidePanelContent;
  const sidePanelClassName = isSidePanelWide ? 'page__sidepanel page__sidepanel--full' : 'page__sidepanel';
  const rightSideClassName = isSidePanelWide && showSidePanel ? 'page__rightside page__rightside--hide' : 'page__rightside';

  return (
    <div className="page">
      {showSidePanel &&
        <div className={sidePanelClassName}>
          {isSidePanelWide && <Button label='X' classColor='inherit' isSmall={true} onClick={toggleSidePanel} />}
          {sidePanelContent}
        </div>}
      <div className={rightSideClassName}>
        <PageHeader toggleSidePanel={toggleSidePanel} hasSidePanelContent={hasSidePanelContent}/>
        <PageContent>{children}</PageContent>
        {footerComponent && <PageFooter> {footerComponent} </PageFooter>}
      </div>
    </div>
  );
};

export default Page;
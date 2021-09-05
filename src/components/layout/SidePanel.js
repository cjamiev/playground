import React from 'react';
import Button from 'components/button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

const NAV_ITEMS = Object.values(ROUTES);

const SidePanel = ({ showSidePanel, sidePanelContent, isSidePanelWide, toggleSidePanel }) => {
  const history = useHistory();
  const currentPage = NAV_ITEMS.find(item => item.url === history.location.pathname);

  if(!showSidePanel) {
    return null;
  }

  const sidePanelClassName = isSidePanelWide ? 'sidepanel sidepanel--full' : 'sidepanel';

  return (
    <div className={sidePanelClassName}>
      <header className="sidepanel__header">
        {isSidePanelWide
          ? <h1 className="sidepanel__title">{currentPage.sidePanelLabel}</h1>
          : <h2 className="sidepanel__title">{currentPage.sidePanelLabel}</h2>}
        {isSidePanelWide && <div className="sidepanel__button">
          <Button label='X' classColor='inherit' isSmall={true} onClick={toggleSidePanel} />
        </div>}
      </header>
      {sidePanelContent}
    </div>
  );
};

export default SidePanel;
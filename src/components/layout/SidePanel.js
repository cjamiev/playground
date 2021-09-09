import React from 'react';
import Button from 'components/button';

const SidePanel = ({ showSidePanel, sidePanelContent, isSidePanelWide, toggleSidePanel, title }) => {
  if(!showSidePanel) {
    return null;
  }

  const sidePanelClassName = isSidePanelWide ? 'sidepanel sidepanel--full' : 'sidepanel';
  const sidePanelHeaderClassName = isSidePanelWide ? 'sidepanel__header--full' : 'sidepanel__header';

  return (
    <div className={sidePanelClassName}>
      <header className={sidePanelHeaderClassName}>
        {isSidePanelWide
          ? <h1 className="sidepanel__title">{title}</h1>
          : <h2 className="sidepanel__title">{title}</h2>}
        {isSidePanelWide && <div className="sidepanel__button">
          <Button label='X' classColor='inherit' isSmall={true} onClick={toggleSidePanel} />
        </div>}
      </header>
      {sidePanelContent}
    </div>
  );
};

export default SidePanel;
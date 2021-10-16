import React from 'react';
import { IconButton } from 'components/button';
import { ICON_TYPES, ICON_SIZES } from 'constants/icon';

const SidePanel = ({ showSidePanel, sidePanelContent, isSidePanelWide, toggleSidePanel, title }) => {
  if (!showSidePanel) {
    return null;
  }

  const sidePanelClassName = isSidePanelWide ? 'sidepanel sidepanel--full' : 'sidepanel';
  const sidePanelHeaderClassName = isSidePanelWide ? 'sidepanel__header--full' : 'sidepanel__header';

  return (
    <div className={sidePanelClassName}>
      {title && (
        <header className={sidePanelHeaderClassName}>
          {isSidePanelWide ? (
            <h1 className="sidepanel__title">{title}</h1>
          ) : (
            <h2 className="sidepanel__title">{title}</h2>
          )}
          {isSidePanelWide && (
            <div className="sidepanel__button">
              <IconButton type={ICON_TYPES.CLOSE} size={ICON_SIZES.SMALL} onClick={toggleSidePanel} />
            </div>
          )}
        </header>
      )}
      {sidePanelContent}
    </div>
  );
};

export default SidePanel;

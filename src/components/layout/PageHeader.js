import React from 'react';
import Alert from 'components/alert';
import { IconButton } from 'components/button';
import { ICON_TYPES, ICON_SIZES } from 'constants/icon';

const PageHeader = ({ toggleSidePanel, hasSidePanelContent, title }) => {
  return (
    <header className="pageheader">
      <h1 className="pageheader__title">{title}</h1>
      {hasSidePanelContent && (
        <div className="pageheader__sidepanel_button">
          <IconButton type={ICON_TYPES.TRIPLE_BAR} size={ICON_SIZES.SMALL} onClick={toggleSidePanel} />
        </div>
      )}
      <Alert />
    </header>
  );
};

export default PageHeader;

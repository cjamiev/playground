import React from 'react';
import Alert from 'components/alert';
import { IconButton } from 'components/button';

const PageHeader = ({ toggleSidePanel, hasSidePanelContent, title }) => {
  return (
    <header className="pageheader">
      <h1 className="pageheader__title">{title}</h1>
      {hasSidePanelContent && (
        <div className="pageheader__sidepanel_button">
          <IconButton type="triple-bar" onClick={toggleSidePanel} />
        </div>
      )}
      <Alert />
    </header>
  );
};

export default PageHeader;

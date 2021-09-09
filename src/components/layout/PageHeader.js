import React from 'react';
import Alert from 'components/alert';
import Button from 'components/button';

const PageHeader = ({ toggleSidePanel, hasSidePanelContent, title }) => {
  return (
    <header className="pageheader">
      <h1 className="pageheader__title">{title}</h1>
      {hasSidePanelContent && <div className="pageheader__sidepanel_button">
        <Button label='(|)' classColor='inherit' isSmall={true} onClick={toggleSidePanel} />
      </div>}
      <Alert />
    </header>
  );
};

export default PageHeader;
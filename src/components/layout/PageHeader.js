import React from 'react';
import Alert from 'components/alert';
import Button from 'components/button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

const NAV_ITEMS = Object.values(ROUTES);

const PageHeader = ({ toggleSidePanel, hasSidePanelContent }) => {
  const history = useHistory();
  const currentPage = NAV_ITEMS.find(item => item.url === history.location.pathname);

  return (
    <header className="pageheader">
      <h1 className="pageheader__title">{currentPage.label}</h1>
      {hasSidePanelContent && <div className="pageheader__sidepanel_button">
        <Button label='(|)' classColor='inherit' isSmall={true} onClick={toggleSidePanel} />
      </div>}
      <Alert />
    </header>
  );
};

export default PageHeader;
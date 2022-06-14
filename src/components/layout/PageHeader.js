import React from 'react';
import Alert from 'components/atoms/Alert';
import { TripleBarSVG } from 'components/icons/TripleBarSVG';
import { SCPageHeader, SCPageHeaderTitle, SCSidepanelBtn } from './styles';

const PageHeader = ({ toggleSidePanel, hasSidePanelContent, title }) => {
  return (
    <SCPageHeader>
      <SCPageHeaderTitle>{title}</SCPageHeaderTitle>
      {hasSidePanelContent && (
        <SCSidepanelBtn>
          <TripleBarSVG ariaLabel="Open or Close Sidepanel" viewBox="0 0 90 90" onClick={toggleSidePanel} />
        </SCSidepanelBtn>
      )}
      <Alert />
    </SCPageHeader>
  );
};

export default PageHeader;

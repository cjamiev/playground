import React from 'react';
import Alert from 'components/alert';
import { TripleBarSVG } from 'components/icons/TripleBarSVG';
import { SCPageHeader, SCPageHeaderTitle, SCSidepanelBtn } from './styles';

const PageHeader = ({ toggleSidePanel, hasSidePanelContent, title }) => {
  return (
    <SCPageHeader>
      <SCPageHeaderTitle>{title}</SCPageHeaderTitle>
      {hasSidePanelContent && (
        <SCSidepanelBtn>
          <svg
            aria-label="Open or Close Sidepanel"
            width="53"
            height="53"
            viewBox="0 0 90 90"
            onClick={toggleSidePanel}
          >
            <TripleBarSVG />
          </svg>
        </SCSidepanelBtn>
      )}
      <Alert />
    </SCPageHeader>
  );
};

export default PageHeader;

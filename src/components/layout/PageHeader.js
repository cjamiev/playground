import React from 'react';
import Alert from 'components/alert';
import { IconButton } from 'components/button';
import { ICON_TYPES, ICON_SIZES } from 'constants/icon';
import { SCPageHeader, SCPageHeaderTitle, SCSidepanelBtn } from './styles';

const PageHeader = ({ toggleSidePanel, hasSidePanelContent, title }) => {
  return (
    <SCPageHeader>
      <SCPageHeaderTitle>{title}</SCPageHeaderTitle>
      {hasSidePanelContent && (
        <SCSidepanelBtn>
          <IconButton type={ICON_TYPES.TRIPLE_BAR} size={ICON_SIZES.SMALL} onClick={toggleSidePanel} />
        </SCSidepanelBtn>
      )}
      <Alert />
    </SCPageHeader>
  );
};

export default PageHeader;

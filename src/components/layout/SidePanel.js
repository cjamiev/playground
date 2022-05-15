import React from 'react';
import { IconButton } from 'components/button';
import { ICON_TYPES, ICON_SIZES } from 'constants/icon';
import { SCSidepanel, SCSidepanelHeader, SCSidepanelTitle, SCSidepanelBtn } from './styles';

const SidePanel = ({ isTransitioningOut, sidePanelContent, isSidePanelWide, toggleSidePanel, title }) => {
  const sidePanelHeaderClassName = isSidePanelWide ? 'sidepanel__header--full' : 'sidepanel__header';

  return (
    <SCSidepanel isFullSize={isSidePanelWide} isTransitioningOut={isTransitioningOut}>
      {title && (
        <SCSidepanelHeader isFullSize={isSidePanelWide}>
          <SCSidepanelTitle>{title}</SCSidepanelTitle>
          {isSidePanelWide && (
            <SCSidepanelBtn>
              <IconButton type={ICON_TYPES.CLOSE} size={ICON_SIZES.SMALL} onClick={toggleSidePanel} />
            </SCSidepanelBtn>
          )}
        </SCSidepanelHeader>
      )}
      {sidePanelContent}
    </SCSidepanel>
  );
};

export default SidePanel;

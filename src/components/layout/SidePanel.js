import React from 'react';
import { CloseSVG } from 'components/icons/CloseSVG';
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
              <svg aria-label="Close Sidepanel" width="27" height="27" viewBox="0 0 53 53" onClick={toggleSidePanel}>
                <CloseSVG isBlack />
              </svg>
            </SCSidepanelBtn>
          )}
        </SCSidepanelHeader>
      )}
      {sidePanelContent}
    </SCSidepanel>
  );
};

export default SidePanel;

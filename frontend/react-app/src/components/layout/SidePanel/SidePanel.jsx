import { SCSidepanel, SCSidepanelHeader, SCSidepanelTitle } from './styles';

const SidePanel = ({ sidePanelContent, title }) => {

  return (
    <SCSidepanel>
      {title && (
        <SCSidepanelHeader>
          <SCSidepanelTitle>{title}</SCSidepanelTitle>
        </SCSidepanelHeader>
      )}
      {sidePanelContent}
    </SCSidepanel>
  );
};

export default SidePanel;

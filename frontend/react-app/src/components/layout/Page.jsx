import { useLocation } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeProvider';
import { ROUTES } from '../../constants/routes';
import PageHeader from './PageHeader';
import SidePanel from './SidePanel';
import { SCLayout, SCPageWrapper, SCPage } from './styles';
import Navigation from './Navigation';

const NAV_ITEMS = Object.values(ROUTES);
const ErrorPage = { label: 'Page Not Found' };

const Page = ({ sidePanelContent, children }) => {
  const { isLightMode } = useThemeContext();
  const location = useLocation();
  const currentPage = NAV_ITEMS.find((item) => item.url === location.pathname) || ErrorPage;
  const hasSidePanelContent = !!sidePanelContent;

  return (
    <SCLayout $isLightMode={isLightMode}>
      <Navigation />
      <SCPageWrapper>
        {hasSidePanelContent && <SidePanel
          sidePanelContent={sidePanelContent}
          title={currentPage.sidePanelLabel}
        />}
        <SCPage>
          <PageHeader title={currentPage.label} />
          <div>{children}</div>
        </SCPage>
      </SCPageWrapper>
    </SCLayout>
  );
};

export default Page;

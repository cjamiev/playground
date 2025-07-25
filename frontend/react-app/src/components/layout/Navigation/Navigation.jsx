import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../../context/ThemeProvider';
import { dismissAlert } from '../../layout/Alert/alertActions';
import { SCNavigation, SCNavigationLink, SCNavigationThemeMode } from './styles';
import { ROUTES, ROUTE_LIST } from '../../../constants/routes';

const Navigation = () => {
  const { isLightMode, switchMode } = useThemeContext();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  const renderNavItems = ROUTE_LIST.map((key) => {
    const route = ROUTES[key];
    const isActive = currentUrl === route.url;
    const handleClick = () => {
      if (currentUrl !== route.url) {
        navigate(route.url);
        setCurrentUrl(route.url);
        dispatch(dismissAlert());
      }
    };

    return (
      <SCNavigationLink
        key={route.url}
        onClick={handleClick}
        $isActive={isActive}
        $islightmode={isLightMode}
      >
        {route.linkLabel}
      </SCNavigationLink>
    );
  });

  return (<SCNavigation>
    {renderNavItems}
    <SCNavigationThemeMode $islightmode={isLightMode} onClick={switchMode}>{isLightMode ? 'Light Mode' : 'Dark Mode'}</SCNavigationThemeMode>
  </SCNavigation>);
};

export default Navigation;

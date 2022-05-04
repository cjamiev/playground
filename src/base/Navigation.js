import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  closeSidePanel,
  closeGlobalModal,
  hideLoadingModal,
  executeCommand
} from 'components/global/globalActions';
import { dismissAlert } from 'components/alert/alertActions';
import { ROUTES } from 'constants/routes';
import { getFormattedClock, getFormattedDate } from 'clock';
import Dropdown from 'components/form/Dropdown';
import { SCNavigation, SCNavigationContent, SCNavigationLinks } from './styles';
import { HomeSVG } from 'components/icons/HomeSVG';

const NAV_ITEMS = Object.values(ROUTES);
const ONE_SECOND = 1000;
const iconMap = {
  'Home': 'HomeIcon',
  'File': 'FileIcon',
  'Clipboard': 'DataIcon',
  'Generator': 'CodeIcon',
  'Experiment': 'FlaskIcon',
  'Project': 'DirectoryIcon',
  'Mock Server': 'ConnectionIcon',
  'Config': 'SettingsIcon'
};
const DROPDOWN_CLASSNAMES = {
  container: 'navigation__dropdown-container',
  label: 'navigation__dropdown-label',
  content: 'navigation__dropdown-content',
  item: 'navigation__dropdown-item'
};

const Navigation = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);
  const [clock, setClock] = useState(getFormattedClock());
  const { commands, links } = useSelector(state => state.config);

  const renderNavItems = NAV_ITEMS.map((item) => {
    const isActiveItem = currentUrl === item.url || (location.pathname === '/' && item.url === ROUTES.HOME.url);
    const iconClass = isActiveItem ? 'navigation__icon--active navigation__icon' : 'navigation__icon';
    const handleClick = () => {
      if (currentUrl !== item.url) {
        navigate(item.url);
        setCurrentUrl(item.url);
        dispatch(closeGlobalModal());
        dispatch(hideLoadingModal());
        dispatch(dismissAlert());
        dispatch(closeSidePanel());
      }
    };

    const IconSVG = iconMap[item.label];

    return (
      <div key={item.url} onClick={handleClick} className="navigation__links-item">
        {item.label}
        {/* <svg
          aria-label={`${item.label} Page`}
          className={iconClass}
          width="53"
          height="53"
          viewBox="0 0 53 53">
          <IconSVG />
        </svg> */}
      </div>
    );
  });

  return (
    <SCNavigation>
      <SCNavigationContent>
        <SCNavigationLinks>{renderNavItems}</SCNavigationLinks>
      </SCNavigationContent>
    </SCNavigation>
  );
});

export default Navigation;

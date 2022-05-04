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
import {
  SCNavigation,
  SCNavigationContent,
  SCNavigationLinks,
  SCNavigationIcon,
  SCNavigationLabels
} from './styles';
import { HomeSVG } from 'components/icons/HomeSVG';
import { ClipboardSVG } from 'components/icons/ClipboardSVG';
import { ArchiveSVG } from 'components/icons/ArchiveSVG';
import { FlaskSVG } from 'components/icons/FlaskSVG';
import { LinkSVG } from 'components/icons/LinkSVG';
import { DirectorySVG } from 'components/icons/DirectorySVG';
import { SettingSVG } from 'components/icons/SettingSVG';
import { TextSVG } from 'components/icons/TextSVG';

const NAV_ITEMS = Object.values(ROUTES);
const ONE_SECOND = 1000;
const iconMap = {
  'Home': HomeSVG,
  'File': ArchiveSVG,
  'Clipboard': ClipboardSVG,
  'Generator': TextSVG,
  'Experiment': FlaskSVG,
  'Project': DirectorySVG,
  'Mock Server': LinkSVG,
  'Config': SettingSVG
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
    const transform = item.label === 'Generator' ?
      'scale(0.4) translate(-5,21)' : 'scale(0.6) translate(6,6)';

    return (
      <SCNavigationLinks key={item.url} onClick={handleClick} isActive={isActiveItem}>
        <SCNavigationIcon isActive={isActiveItem}>
          {IconSVG && <svg
            aria-label={`${item.label} Page`}
            width="53"
            height="53"
            viewBox="0 0 53 53">
            <IconSVG transform={transform} text='</>'/>
          </svg> }
        </SCNavigationIcon>
        <SCNavigationLabels>{item.label}</SCNavigationLabels>
      </SCNavigationLinks>
    );
  });

  return (
    <SCNavigation>
      <SCNavigationContent>
        {renderNavItems}
      </SCNavigationContent>
    </SCNavigation>
  );
});

export default Navigation;

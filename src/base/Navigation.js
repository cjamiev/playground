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
import { getFormattedDate } from 'clock';
import {
  SCNavigation,
  SCWeek,
  SCNavigationContent,
  SCNavigationLinks,
  SCNavigationIcon,
  SCNavigationLabels
} from './styles';
import { navigationMap } from './data';

const Navigation = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  const renderNavItems = navigationMap.map((item) => {
    const isActive = currentUrl === item.url;
    const IconSVG = item.icon;
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

    return (
      <SCNavigationLinks
        key={item.url}
        onClick={handleClick}
        isActive={isActive}
        isAtBottom={item.isAtBottom}
      >
        <SCNavigationIcon isActive={isActive}>
          <svg
            aria-label={`${item.label} Page`}
            width="45"
            height="53"
            viewBox="0 0 53 53">
            <IconSVG {...item.props} />
          </svg>
        </SCNavigationIcon>
        <SCNavigationLabels>{item.label}</SCNavigationLabels>
      </SCNavigationLinks>
    );
  });

  return (
    <SCNavigation>
      <SCNavigationContent>
        <SCWeek>{getFormattedDate().week}</SCWeek>
        {renderNavItems}
      </SCNavigationContent>
    </SCNavigation>
  );
});

export default Navigation;

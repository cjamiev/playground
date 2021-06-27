import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeGlobalModal, hideLoadingModal } from 'components/modal/globalModalActions';
import { ROUTES } from 'constants/routes';
import { getFormattedClock, getFormattedDate } from 'clock';
import './navigation.css';

const NAV_ITEMS = Object.values(ROUTES);
const ONE_SECOND = 1000;

const Navigation = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentUrl, setCurrentUrl] = useState(history.location.pathname);
  const [clock, setClock] = useState(getFormattedClock());

  const renderNavItems = NAV_ITEMS.map(item => {
    const navItemClass = (currentUrl === item.url) || (history.location.pathname === '/' && item.url === ROUTES.HOME.url) ? 'navigation__links-item navigation__links-item--active': 'navigation__links-item';
    const handleClick = () => {
      if(currentUrl !== item.url){
        history.push(item.url);
        setCurrentUrl(item.url);
        dispatch(closeGlobalModal());
        dispatch(hideLoadingModal());
      }
    };

    return (
      <div key={item.url} className={navItemClass} onClick={handleClick}>
        {item.label}
      </div>
    );
  });

  setInterval(() => { setClock(getFormattedClock()); }, ONE_SECOND);

  return (
    <nav className="navigation">
      <div className="navigation__time">
        <span>{clock}</span>
        <span>{getFormattedDate().date}</span>
        <span>{getFormattedDate().week}</span>
      </div>
      <div className="navigation__links">
        {renderNavItems}
      </div>
    </nav>
  );
});

export default Navigation;

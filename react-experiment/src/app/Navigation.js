import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeGlobalModal, hideLoadingModal } from 'components/modal/globalModalActions';
import './navigation.css';

const NAV_ITEMS = [
  { label: 'Home', url: '/home'},
  { label: 'Todo', url: '/todo'}
];

const INDEX_ZERO = 0;

const Navigation = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentUrl, setCurrentUrl] = useState(history.location.pathname);

  const renderNavItems = NAV_ITEMS.map(item => {
    const navItemClass = (currentUrl === item.url) || (history.location.pathname === '/' && item.url === NAV_ITEMS[INDEX_ZERO].url) ? 'navigation__links-item navigation__links-item--active': 'navigation__links-item';
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

  return (
    <Fragment>
      <nav className="navigation">
        <div className="navigation__links">
          {renderNavItems}
        </div>
      </nav>
    </Fragment>
  );
});

export default Navigation;

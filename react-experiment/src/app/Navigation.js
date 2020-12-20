import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

const navStyle = {
  cursor: 'pointer'
};

const NAV_ITEMS = [
  { label: 'Home', url: '/home'},
  { label: 'Test Swap Select', url: '/test-swap-select'},
  { label: 'Todo', url: '/todo-app'}
];

const Navigation = React.memo(() => {
  const history = useHistory();
  const [toggleNav, setToggleNav] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(history.location.pathname);
  const expandNav = toggleNav ? 'navbar-collapse collapse show' : 'navbar-collapse collapse';

  const renderNavItems = NAV_ITEMS.map(item => {
    const navItemClass = currentUrl === item.url ? 'nav-item nav-link active': 'nav-item nav-link';
    const handleClick = () => {
      if(history.location.pathname !== item.url){
        history.push(item.url);
        setCurrentUrl(item.url);
      }
    };

    return (
      <div key={item.url} style={navStyle} className={navItemClass} onClick={handleClick}>
        {item.label}
      </div>
    );
  });

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button className="navbar-toggler" onClick={() => {setToggleNav(!toggleNav);}} aria-controls="navbarSupportedContent" aria-expanded={toggleNav} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={expandNav} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {renderNavItems}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
});

export default Navigation;

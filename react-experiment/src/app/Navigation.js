import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = React.memo(() => {
  const [toggleNav, setToggleNav] = useState(false);
  const expandNav = toggleNav ? 'navbar-collapse collapse show' : 'navbar-collapse collapse';

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button className="navbar-toggler" onClick={() => {setToggleNav(!toggleNav);}} aria-controls="navbarSupportedContent" aria-expanded={toggleNav} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={expandNav} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/experiment">
                Experiment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/test-container">
                Test Container
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/test-dynamic-form">
                Test Dynamic Form
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/test-swap-select">
                Test Swap Select
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/todo-app">
              Todo App
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
});

export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = React.memo(() => {
  const activeStyle = { color: 'blue' };

  return (
    <>
      <NavLink to="/experiment" activeStyle={activeStyle}>Experiment|</NavLink>
      <NavLink to="/test-container" activeStyle={activeStyle}>Test Container|</NavLink>
      <NavLink to="/test-dynamic-form" activeStyle={activeStyle}>Test Dynamic Form|</NavLink>
      <NavLink to="/test-swap-select" activeStyle={activeStyle}>Test Swap Select|</NavLink>
      <NavLink to="/todo-app" activeStyle={activeStyle}>Todo App</NavLink>
    </>
  );
});

export default Navigation;

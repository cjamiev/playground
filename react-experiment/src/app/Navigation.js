import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = React.memo(() => {
  const activeStyle = { color: 'blue' };

  return (
    <>
      <NavLink to="/experiment" replace activeStyle={activeStyle}>
        Experiment|
      </NavLink>
      <NavLink to="/test-container" replace activeStyle={activeStyle}>
        Test Container|
      </NavLink>
      <NavLink to="/test-dynamic-form" replace activeStyle={activeStyle}>
        Test Dynamic Form|
      </NavLink>
      <NavLink to="/test-swap-select" replace activeStyle={activeStyle}>
        Test Swap Select|
      </NavLink>
      <NavLink to="/todo-app" replace activeStyle={activeStyle}>
        Todo App
      </NavLink>
    </>
  );
});

export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = React.memo(props => {
  const activeStyle = { color: 'blue' };
  return (
    <>
      <NavLink exact to="/" activeStyle={activeStyle}>Sandbox|</NavLink>
      <NavLink to="/table" activeStyle={activeStyle}>Table|</NavLink>
      <NavLink to="/form" activeStyle={activeStyle}>Form|</NavLink>
      <NavLink to="/todo-app" activeStyle={activeStyle}>Todo App|</NavLink>
      <NavLink to="/test-api" activeStyle={activeStyle}>Test Api</NavLink>
    </>
  );
});

export default Navigation;
/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';

import Sandbox from './Sandbox';
import Form from './Form';
import Table from './Table';
import TodoApp from './TodoApp';
import TestApi from '../containers/TestApi';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class Navigation extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Sandbox</NavLink>
          {' | '}
          <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
          {' | '}
          <NavLink to="/table" activeStyle={activeStyle}>Table</NavLink>
          {' | '}
          <NavLink to="/form" activeStyle={activeStyle}>Form</NavLink>
          {' | '}
          <NavLink to="/todo-app" activeStyle={activeStyle}>Todo App</NavLink>
          {' | '}
          <NavLink to="/test-api" activeStyle={activeStyle}>Test Api</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={Sandbox} />
          <Route path="/table" component={Table} />
          <Route path="/form" component={Form} />
          <Route path="/todo-app" component={TodoApp} />
          <Route path="/test-api" component={TestApi} />
          <Route component={NotFoundPage} />
        </Switch>
        <footer className="page-footer font-small pt-4">
          <div className="footer-copyright text-center py-3">
            © 2019 Copyright: React Test Bench
            <a href="https://reactjs.org/docs/getting-started.html"> Doc </a>
          </div>
        </footer>
      </div>
    );
  }
}

Navigation.propTypes = {
  children: PropTypes.element
};

export default hot(module)(Navigation);

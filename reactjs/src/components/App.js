/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from 'react-router-dom';

import AboutPage from './AboutPage';
import FuelSavingsPage from '../containers/FuelSavingsPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';
import Navigation from './Navigation';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Navigation />
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

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);

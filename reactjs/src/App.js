import React, { Component } from 'react';

import Navigation from './Navigation';

export default class App extends Component {

  render() {
    return (
      <>
        <Navigation />
        <footer className="page-footer font-small pt-4">
          <div className="footer-copyright text-center py-3">
            © 2019 Copyright: React Test Bench
            <a href="https://reactjs.org/docs/getting-started.html"> Doc </a>
          </div>
        </footer>
      </>
    );
  }
}

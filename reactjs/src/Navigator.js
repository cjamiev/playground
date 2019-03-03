import React, { Component } from 'react';

import Experiment from './Experiment';
import Form from './components/Form';
import Generator from './Generator';
import Table from './components/Table';
import TodoApp from './components/TodoApp';

export default class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = { routeIndex: 0 };
    this.switchToExperimentComponent = this.switchToExperimentComponent.bind(this);
    this.switchToFormComponent = this.switchToFormComponent.bind(this);
    this.switchToGeneratorComponent = this.switchToGeneratorComponent.bind(this);
    this.switchToTableComponent = this.switchToTableComponent.bind(this);
    this.switchToTodoComponent = this.switchToTodoComponent.bind(this);
  }

  switchToExperimentComponent() {
    this.setState({
      routeIndex: 0
    });
  }

  switchToTableComponent() {
    this.setState({
      routeIndex: 1
    });
  }

  switchToFormComponent() {
    this.setState({
      routeIndex: 2
    });
  }

  switchToGeneratorComponent() {
    this.setState({
      routeIndex: 3
    });
  }

  switchToTodoComponent() {
    this.setState({
      routeIndex: 4
    });
  }

  renderPage() {
    if (this.state.routeIndex === 0) {
      return <Experiment />;
    } else if (this.state.routeIndex === 1) {
      return <Table />;
    } else if (this.state.routeIndex === 2) {
      return <Form />;
    } else if (this.state.routeIndex === 3) {
      return <Generator />;
    } else if (this.state.routeIndex === 4) {
      return <TodoApp />;
    } else {
      return;
    }
  }

  render() {
    return (
      <>
        <header>
          <nav>
            <button onClick={this.switchToExperimentComponent}>Experiment</button>
            <button onClick={this.switchToTableComponent}>Table</button>
            <button onClick={this.switchToFormComponent}>Form</button>
            <button onClick={this.switchToGeneratorComponent}>Generator</button>
            <button onClick={this.switchToTodoComponent}>Todo App</button>
          </nav>
        </header>
        {this.renderPage()}
        <footer className="page-footer font-small pt-4">
          <div className="footer-copyright text-center py-3">
            © 2019 Copyright: React Test Bench
            <a href="https://reactjs.org/docs/getting-started.html"> Doc</a>
          </div>
        </footer>
      </>
    );
  }
}

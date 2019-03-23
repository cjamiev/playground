import React, { Component } from 'react';

import Sandbox from './Sandbox';
import Form from './Form';
import Table from './Table';
import TodoApp from './TodoApp';
import TestApi from '../containers/TestApi';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { routeIndex: 0 };
    this.switchToSandboxComponent = this.switchToSandboxComponent.bind(this);
    this.switchToFormComponent = this.switchToFormComponent.bind(this);
    this.switchToTableComponent = this.switchToTableComponent.bind(this);
    this.switchToTodoComponent = this.switchToTodoComponent.bind(this);
    this.switchToTestApiComponent = this.switchToTestApiComponent.bind(this);
  }

  switchToSandboxComponent() {
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

  switchToTodoComponent() {
    this.setState({
      routeIndex: 4
    });
  }

  switchToTestApiComponent() {
    this.setState({
      routeIndex: 3
    });
  }

  renderPage() {
    if (this.state.routeIndex === 0) {
      return <Sandbox />;
    } else if (this.state.routeIndex === 1) {
      return <Table />;
    } else if (this.state.routeIndex === 2) {
      return <Form />;
    } else if (this.state.routeIndex === 3) {
      return <TestApi />;
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
            <button onClick={this.switchToSandboxComponent}>Sandbox</button>
            <button onClick={this.switchToTableComponent}>Table</button>
            <button onClick={this.switchToFormComponent}>Form</button>
            <button onClick={this.switchToTodoComponent}>Todo App</button>
            <button onClick={this.switchToTestApiComponent}>Test Api</button>
          </nav>
        </header>
        {this.renderPage()}
      </>
    );
  }
}

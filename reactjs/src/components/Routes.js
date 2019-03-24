import { Route, Switch } from 'react-router-dom';

import React from 'react';

import Form from './Form';
import NotFoundPage from './NotFoundPage';
import Sandbox from './Sandbox';
import Table from './Table';
import TestApi from '../containers/TestApi';
import TodoApp from './TodoApp';

const Routes = React.memo(() => {
  return (
    <Switch>
      <Route exact path="/" component={Sandbox} />
      <Route path="/table" component={Table} />
      <Route path="/form" component={Form} />
      <Route path="/todo-app" component={TodoApp} />
      <Route path="/test-api" component={TestApi} />
      <Route component={NotFoundPage} />
    </Switch>
  );
});

export default Routes;
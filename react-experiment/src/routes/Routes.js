import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Experiment from 'experiment';
import TestContainer from 'experiment/TestContainer';
import TestDynamicForm from 'experiment/TestDynamicForm';
import TestSwapSelect from 'experiment/TestSwapSelect';
import TodoApp from 'experiment/TodoApp';

const NotFoundPage = React.memo(() => {
  return (
    <div>
      <h4>404 Page Not Found</h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
});

const Routes = React.memo(() => {
  return (
    <Switch>
      <Route exact path="/" component={Experiment} />
      <Route path="/experiment" component={Experiment} />
      <Route path="/test-container" component={TestContainer} />
      <Route path="/test-dynamic-form" component={TestDynamicForm} />
      <Route path="/test-swap-select" component={TestSwapSelect} />
      <Route path="/todo-app" component={TodoApp} />
      <Route component={NotFoundPage} />
    </Switch>
  );
});

export default Routes;

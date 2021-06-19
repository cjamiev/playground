import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Home from './home';
import Todo from './todo';

const NotFoundPage = React.memo(() => {
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
});

const Routes = React.memo(() => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/todo" component={Todo} />
      <Route component={NotFoundPage} />
    </Switch>
  );
});

export default Routes;

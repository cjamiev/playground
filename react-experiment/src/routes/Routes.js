import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

import Home from './home';
import Todo from './experiment';

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
      <Route exact path="/">
        <Redirect to={ROUTES.HOME.url} />
      </ Route>
      <Route path={ROUTES.HOME.url} component={Home} />
      <Route path={ROUTES.EXPERIMENT.url} component={Todo} />
      <Route component={NotFoundPage} />
    </Switch>
  );
});

export default Routes;

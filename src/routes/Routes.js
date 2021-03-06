import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

import Home from './home';
import Clipboard from './clipboard';
import Experiment from './experiment';
import MockServer from './mockserver';
import Generator from './generator';
import StyleGuide from './styleguide';

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
      <Route path={ROUTES.CLIPBOARD.url} component={Clipboard} />
      <Route path={ROUTES.EXPERIMENT.url} component={Experiment} />
      <Route path={ROUTES.MOCKSERVER.url} component={MockServer} />
      <Route path={ROUTES.GENERATOR.url} component={Generator} />
      <Route path={ROUTES.STYLE_GUIDE.url} component={StyleGuide} />
      <Route component={NotFoundPage} />
    </Switch>
  );
});

export default Routes;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

import Clipboard from './clipboard';
import Config from './config';
import Experiment from './experiment';
import ErrorPage from './errorpage';
import File from './file';
import Generator from './generator';
import Home from './home';
import MockServer from './mockserver';
import Project from './project';

const Routes = React.memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={ROUTES.HOME.url} />
      </Route>
      <Route path={ROUTES.CLIPBOARD.url} component={Clipboard} />
      <Route path={ROUTES.EXPERIMENT.url} component={Experiment} />
      <Route path={ROUTES.FILE.url} component={File} />
      <Route path={ROUTES.GENERATOR.url} component={Generator} />
      <Route path={ROUTES.PROJECT.url} component={Project} />
      <Route path={ROUTES.HOME.url} component={Home} />
      <Route path={ROUTES.MOCKSERVER.url} component={MockServer} />
      <Route path={ROUTES.CONFIG.url} component={Config} />
      <Route component={ErrorPage} />
    </Switch>
  );
});

export default Routes;

import React from 'react';
import { Navigate, Redirect, Route, Routes } from 'react-router-dom';
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

const AppRoutes = React.memo(() => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={ROUTES.HOME.url} />} />}
      <Route path={ROUTES.CLIPBOARD.url} element={<Clipboard />} />
      <Route path={ROUTES.EXPERIMENT.url} element={<Experiment />} />
      <Route path={ROUTES.FILE.url} element={<File />} />
      <Route path={ROUTES.GENERATOR.url} element={<Generator />} />
      <Route path={ROUTES.PROJECT.url} element={<Project />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path={ROUTES.MOCKSERVER.url} element={<MockServer />} />
      <Route path={ROUTES.CONFIG.url} element={<Config />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
});

export default AppRoutes;

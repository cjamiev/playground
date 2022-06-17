import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

import ErrorPage from 'components/pages/ErrorPage';
import File from 'components/pages/File';
import Home from 'components/pages/Home';
import Experiment from 'components/pages/Experiment';
import Generator from 'components/pages/Generator';
import Settings from 'components/pages/Settings';

const AppRouter = React.memo(() => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={ROUTES.HOME.url} />} />}
      <Route path={ROUTES.FILE.url} element={<File />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path={ROUTES.EXPERIMENT.url} element={<Experiment />} />
      <Route path={ROUTES.GENERATOR.url} element={<Generator />} />
      <Route path={ROUTES.SETTINGS.url} element={<Settings />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
});

export default AppRouter;

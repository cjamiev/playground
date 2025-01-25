import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Experiment from '../pages/Experiment';
import Generator from '../pages/Generator';
import Settings from '../pages/Settings';
import CardPage from '../pages/CardPage';
import DropdownPage from '../pages/DropdownPage';
import FormPage from '../pages/FormPage';
import ListPage from '../pages/ListPage';
import TablePage from '../pages/TablePage';

const AppRouter = React.memo(() => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={ROUTES.HOME.url} />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path={ROUTES.EXPERIMENT.url} element={<Experiment />} />
      <Route path={ROUTES.GENERATOR.url} element={<Generator />} />
      <Route path={ROUTES.SETTINGS.url} element={<Settings />} />
      <Route path={ROUTES.CARD_PAGE.url} element={<CardPage />} />
      <Route path={ROUTES.DROPDOWN_PAGE.url} element={<DropdownPage />} />
      <Route path={ROUTES.FORM_PAGE.url} element={<FormPage />} />
      <Route path={ROUTES.LIST_PAGE.url} element={<ListPage />} />
      <Route path={ROUTES.TABLE_PAGE.url} element={<TablePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
});

export default AppRouter;

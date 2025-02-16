import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import ReactPage from '../pages/ReactPage';
import CssPage from '../pages/CssPage';
import JsPage from '../pages/JsPage';
import LiveCoding from '../pages/Coding';

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={ROUTES.HOME.url} />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path={ROUTES.CODING.url} element={<LiveCoding />} />
      <Route path={ROUTES.REACT_PAGE.url} element={<ReactPage />} />
      <Route path={ROUTES.JS_PAGE.url} element={<JsPage />} />
      <Route path={ROUTES.CSS_PAGE.url} element={<CssPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;

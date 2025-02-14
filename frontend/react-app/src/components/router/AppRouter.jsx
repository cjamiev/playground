import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Interview from '../pages/Interview';
import JsConcepts from '../pages/JsConcepts';
import LiveCoding from '../pages/Coding';

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={ROUTES.HOME.url} />} />
      <Route path={ROUTES.HOME.url} element={<Home />} />
      <Route path={ROUTES.CODING.url} element={<LiveCoding />} />
      <Route path={ROUTES.INTERVIEW.url} element={<Interview />} />
      <Route path={ROUTES.JS_CONCEPTS.url} element={<JsConcepts />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

import alertReducer from '../components/layout/Alert/alertReducer';
import todoReducer from '../components/atoms/Todo/todoReducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
export const store = configureStore({
  reducer: combineReducers({
    alert: alertReducer,
    todos: todoReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

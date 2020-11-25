import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import testReducer from './experiment/testReducer';

export const customMiddleware = ({ dispatch, getState }) => next => action => {
  return next(action);
};

const history = createHashHistory({ hashType: 'slash' });
const middlewares = [thunk, customMiddleware, routerMiddleware(history)];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}
const middlewareDev = applyMiddleware(...middlewares);

const rootReducer = browserHistory => {
  return combineReducers({
    router: connectRouter(browserHistory),
    test: testReducer
  });
};

const configureStore = initialState => {
  const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer(history), initialState, composeEnhancers(middlewareDev));

  return store;
};

export { configureStore, history };

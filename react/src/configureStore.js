import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import testReducer from 'experiment/testReducer';

const history = createBrowserHistory();
const middlewareDev = applyMiddleware(thunk, routerMiddleware(history), logger);
const rootReducer = browserHistory =>
  combineReducers({
    router: connectRouter(browserHistory),
    test: testReducer
  });

const configureStore = initialState => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer(history), initialState, composeEnhancers(middlewareDev));

  return store;
};

export { configureStore, history };

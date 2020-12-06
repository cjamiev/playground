import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import testReducer from './experiment/testReducer';
import experimentReducer from './experiment/experimentReducer';
import modalReducer from './components/modalReducer';

export const customMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  return next(action);
};

const middlewares = [thunk, customMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}
const middlewareDev = applyMiddleware(...middlewares);

const rootReducer = combineReducers({
  experiment: experimentReducer,
  modal: modalReducer,
  test: testReducer
});

const configureStore = (initialState) => {
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(middlewareDev));

  return store;
};

export { configureStore };

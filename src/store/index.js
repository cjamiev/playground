import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import listReducer from 'components/list/listReducer';
import clipboardReducer from 'routes/clipboard/clipboardReducer';
import globalModalReducer from 'components/modal/globalModalReducer';
import testApiReducer from 'routes/experiment/testapi/testApiReducer';
import testReducer from 'routes/experiment/testredux/reducer';

const customMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  return next(action);
};

const middlewares = [thunk, customMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}
const appliedMiddlewares = applyMiddleware(...middlewares);

const rootReducer = combineReducers({
  clipboard: clipboardReducer,
  list: listReducer,
  globalModal: globalModalReducer,
  experiment: testReducer,
  testApi: testApiReducer
});

const configureStore = (initialState) => {
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(appliedMiddlewares));

  return store;
};

export { rootReducer, configureStore };

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
import alertReducer from 'components/alert/alertReducer';
import globalModalReducer from 'components/modal/globalModalReducer';
import testApiReducer from 'routes/experiment/testapi/testApiReducer';
import testReduxReducer from 'routes/experiment/testredux/testReduxReducer';
import mockserverReducer from 'routes/mockserver/mockserverReducer';

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
  alert: alertReducer,
  globalModal: globalModalReducer,
  experiment: combineReducers({
    testRedux: testReduxReducer,
    testApi: testApiReducer
  }),
  mockserver: mockserverReducer
});

const configureStore = (initialState) => {
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(appliedMiddlewares));

  return store;
};

export { rootReducer, configureStore };

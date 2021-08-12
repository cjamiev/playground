import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import alertReducer from 'components/alert/alertReducer';
import clipboardReducer from 'routes/clipboard/clipboardReducer';
import homeReducer from 'routes/home/homeReducer';
import globalModalReducer from 'components/modal/globalModalReducer';
import listReducer from 'components/list/listReducer';
import mockserverReducer from 'routes/mockserver/mockserverReducer';
import testApiReducer from 'routes/experiment/testapi/testApiReducer';
import testReduxReducer from 'routes/experiment/testredux/testReduxReducer';

const customMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  return next(action);
};

const middlewares = [thunk, customMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}
const appliedMiddlewares = applyMiddleware(...middlewares);

const rootReducer = combineReducers({
  alert: alertReducer,
  clipboard: clipboardReducer,
  experiment: combineReducers({
    testRedux: testReduxReducer,
    testApi: testApiReducer
  }),
  home: homeReducer,
  globalModal: globalModalReducer,
  list: listReducer,
  mockserver: mockserverReducer
});

const configureStore = (initialState) => {
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(appliedMiddlewares));

  return store;
};

export { rootReducer, configureStore };

import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import alertReducer from 'components/alert/alertReducer';
import clipboardReducer from 'routes/clipboard/clipboardReducer';
import settingsReducer from 'routes/settings/settingsReducer';
import experimentReducer from 'routes/experiment/experimentReducer';
import fileReducer from 'routes/file/fileReducer';
import homeReducer from 'routes/home/homeReducer';
import generatorReducer from 'routes/experiment/generator/generatorReducer';
import projectReducer from 'routes/project/projectReducer';
import globalReducer from 'components/global/globalReducer';
import mockserverReducer from 'routes/experiment/mockserver/mockserverReducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const appliedMiddlewares = applyMiddleware(...middlewares);

const rootReducer = combineReducers({
  alert: alertReducer,
  clipboard: clipboardReducer,
  settings: settingsReducer,
  experiment: experimentReducer,
  file: fileReducer,
  home: homeReducer,
  generator: generatorReducer,
  global: globalReducer,
  mockserver: mockserverReducer,
  project: projectReducer
});

const configureStore = (initialState) => {
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(appliedMiddlewares));

  return store;
};

export { rootReducer, configureStore };

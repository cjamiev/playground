import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import alertReducer from 'components/alert/alertReducer';
import clipboardReducer from 'components/pages/Clipboard/clipboardReducer';
import settingsReducer from 'components/pages/Settings/settingsReducer';
import experimentReducer from 'routes/experiment/experimentReducer';
import fileReducer from 'components/pages/File/fileReducer';
import homeReducer from 'components/pages/Home/homeReducer';
import generatorReducer from 'routes/experiment/generator/generatorReducer';
import projectReducer from 'components/pages/Project/projectReducer';
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

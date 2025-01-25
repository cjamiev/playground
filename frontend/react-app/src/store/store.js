import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

import alertReducer from '../components/layout/Alert/alertReducer';
import settingsReducer from '../components/pages/Settings/settingsReducer';
import generatorReducer from '../components/pages/Generator/generatorReducer';
import homeReducer from '../components/pages/Home/homeReducer';
import globalReducer from '../components/molecules/Global/globalReducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const appliedMiddlewares = applyMiddleware(...middlewares);

const rootReducer = combineReducers({
  alert: alertReducer,
  settings: settingsReducer,
  home: homeReducer,
  global: globalReducer,
  generator: generatorReducer
});


const configureStore = (initialState) => {
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(appliedMiddlewares));

  return store;
};

export { rootReducer, configureStore };

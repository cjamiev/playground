import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import localeProviderReducer from './localeReducer';
import testReducer from './testReducer';

const rootReducer = (history) => combineReducers({
  language: localeProviderReducer,
  router: connectRouter(history),
  test: testReducer
});

export default rootReducer;

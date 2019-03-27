import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import languageProviderReducer from '../containers/LanguageProvider/reducer';
import testReducer from './testReducer';

const rootReducer = (history) => combineReducers({
  language: languageProviderReducer,
  router: connectRouter(history),
  test: testReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import testReducer from './testReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  test: testReducer
});

export default rootReducer;

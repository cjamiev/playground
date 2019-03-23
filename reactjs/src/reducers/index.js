import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import testReducer from './testReducer';

const rootReducer = combineReducers({
  fuelSavings,
  test: testReducer
});

export default rootReducer;

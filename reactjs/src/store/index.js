import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers';

const addOns = (process.env.NOD_ENV !== 'production') ? [thunk, logger] : [thunk];
const middlewares = compose(applyMiddleware(...addOns));

const store = createStore(
  rootReducer,
  middlewares
);

export default store;
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export const history = createBrowserHistory();
const middlewareProd = applyMiddleware(thunk, routerMiddleware(history));
const middlewareDev = applyMiddleware(thunk, routerMiddleware(history), logger);

const configureStoreProd = initialState => {
  return createStore(
    rootReducer(history),
    initialState,
    compose(middlewareProd)
  );
};

const configureStoreDev = (initialState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(middlewareDev)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer(history));
    });
  }

  return store;
};

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;

/* eslint-disable max-params */
import React from 'react';
import { render } from '@testing-library/react';
import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Page from '../src/components/layout';
import { rootReducer } from '../src/store';
import { GlobalModal } from 'components/modal/GlobalModal';
import { listInitialState } from '../src/components/list/listReducer';
import { clipboardInitialState } from '../src/routes/clipboard/clipboardReducer';
import { alertInitialState } from '../src/components/alert/alertReducer';
import { globalModalInitialState } from '../src/components/modal/globalModalReducer';
import { testApiInitialState } from '../src/routes/experiment/testApi/testApiReducer';
import { testReduxInitialState } from '../src/routes/experiment/testRedux/testReduxReducer';
import { mockserverInitialState } from '../src/routes/mockserver/mockserverReducer';
import { isEmpty } from 'booleanHelper';

const middlewares = [thunk];
const appliedMiddlewares = applyMiddleware(...middlewares);

const defaultStore = {
  clipboard: clipboardInitialState,
  list: listInitialState,
  alert: alertInitialState,
  globalModal: globalModalInitialState,
  experiment: {
    testApi: testApiInitialState,
    testRedux: testReduxInitialState
  },
  mockserver: mockserverInitialState
};

const simpleTestWrapper = (Component, props = {}) => {
  return render(<Component {...props} />);
};

const reduxTestWrapper = (Component, props = {}, reduxProps = {}, locationPathname = '/home') => {
  const store = createStore(rootReducer, { ...defaultStore, ...reduxProps }, compose(appliedMiddlewares));
  const history = createMemoryHistory();
  history.push(locationPathname);

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Component {...props} />
      </Router>
    </Provider>
  );
};

const fullTestWrapper = (Component, props = {}, reduxProps = {}, locationPathname = '/home', shouldRenderPage = false) => {
  const store = createStore(rootReducer, { ...defaultStore, ...reduxProps }, compose(appliedMiddlewares));
  const history = createMemoryHistory();
  history.push(locationPathname);

  const renderComponent = shouldRenderPage ? (<Page><Component {...props} /></Page>): <Component {...props} />;

  const wrapper = render(
    <Provider store={store}>
      <Router history={history}>
        <GlobalModal />
        {renderComponent}
      </Router>
    </Provider>
  );

  return { wrapper, history };
};

export {
  simpleTestWrapper,
  reduxTestWrapper,
  fullTestWrapper
};
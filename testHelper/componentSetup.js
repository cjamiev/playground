import React from 'react';
import { render } from '@testing-library/react';
import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { rootReducer } from '../src/store';
import { GlobalModal } from 'components/modal/GlobalModal';
import { listInitialState } from '../src/components/list/listReducer';
import { clipboardInitialState } from '../src/routes/clipboard/clipboardReducer';
import { alertInitialState } from '../src/components/alert/alertReducer';
import { globalModalInitialState } from '../src/components/modal/globalModalReducer';
import { testApiInitialState } from '../src/routes/experiment/testApi/testApiReducer';
import { testReduxInitialState } from '../src/routes/experiment/testRedux/testReduxReducer';
import { mockserverInitialState } from '../src/routes/mockserver/mockserverReducer';

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

const testRenderComponent = (Component, props = {}) => {
  return render(<Component {...props} />);
};

// eslint-disable-next-line max-params
const testRenderContainer = (Component, props = {}, storeState = {}, shouldRenderRootComponents = true) => {
  const store = createStore(rootReducer, { ...defaultStore, ...storeState }, compose(appliedMiddlewares));

  return render(
    <Provider store={store}>
      <Router>
        {shouldRenderRootComponents && <GlobalModal />}
        <Component {...props} />
      </Router>
    </Provider>
  );
};

export {
  testRenderComponent,
  testRenderContainer
};
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { rootReducer } from '../src/store';
import { listInitialState } from '../src/components/list/listReducer';
import { clipboardInitialState } from '../src/routes/clipboard/clipboardReducer';
import { alertInitialState } from '../src/components/alert/alertReducer';
import { globalModalInitialState } from '../src/components/modal/globalModalReducer';
import { testApiInitialState } from '../src/routes/experiment/testApi/testApiReducer';
import { testReduxInitialState } from '../src/routes/experiment/testRedux/testReduxReducer';
import { mockserverInitialState } from '../src/routes/mockserver/mockserverReducer';

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

const testRenderContainer = (Component, props = {}, storeState = {}) => {
  const store = createStore(rootReducer, { ...defaultStore, ...storeState });

  return render(
    <Provider store={store}>
      <Router>
        <Component {...props} />
      </Router>
    </Provider>
  );
};

export {
  testRenderComponent,
  testRenderContainer
};
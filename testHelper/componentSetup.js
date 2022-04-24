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
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Page from '../src/components/layout';
import { rootReducer } from '../src/store';
import Global from 'components/global';
import { alertInitialState } from '../src/components/alert/alertReducer';
import { clipboardInitialState } from '../src/routes/clipboard/clipboardReducer';
import { configInitialState } from '../src/routes/config/configReducer';
import { experimentInitialState } from '../src/routes/experiment/experimentReducer';
import { fileInitialState } from '../src/routes/file/fileReducer';
import { homeInitialState } from '../src/routes/home/homeReducer';
import { generatorInitialState } from '../src/routes/generator/generatorReducer';
import { projectInitialState } from '../src/routes/project/projectReducer';
import { globalInitialState } from '../src/components/global/globalReducer';
import { mockserverInitialState } from '../src/routes/mockserver/mockserverReducer';
import { isEmpty } from 'booleanHelper';
import { ROUTES } from 'constants/routes';

const middlewares = [thunk];
const appliedMiddlewares = applyMiddleware(...middlewares);

const defaultStore = {
  alert: alertInitialState,
  clipboard: clipboardInitialState,
  config: configInitialState,
  experiment: experimentInitialState,
  file: fileInitialState,
  home: homeInitialState,
  generator: generatorInitialState,
  global: globalInitialState,
  mockserver: mockserverInitialState,
  project: projectInitialState
};

const simpleTestWrapper = (Component, props = {}) => {
  return render(<Component {...props} />);
};

const reduxTestWrapper = (Component, props = {}, reduxProps = {}, locationPathname = ROUTES.HOME.url) => {
  const store = createStore(rootReducer, { ...defaultStore, ...reduxProps }, compose(appliedMiddlewares));

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[locationPathname]}>
        <Component {...props} />
      </MemoryRouter>
    </Provider>
  );
};

const fullTestWrapper = (Component, props = {}, reduxProps = {}, locationPathname = ROUTES.HOME.url, shouldRenderPage = false) => {
  const store = createStore(rootReducer, { ...defaultStore, ...reduxProps }, compose(appliedMiddlewares));

  const renderComponent = shouldRenderPage ? (<Page><Component {...props} /></Page>): <Component {...props} />;

  const wrapper = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[locationPathname]}>
        <Global />
        {renderComponent}
      </MemoryRouter>
    </Provider>
  );

  return { wrapper, history };
};

export {
  simpleTestWrapper,
  reduxTestWrapper,
  fullTestWrapper
};
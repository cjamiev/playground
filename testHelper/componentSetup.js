import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { rootReducer } from '../src/store';

const testRenderComponent = (Component, props = {}) => {
  return render(<Component {...props} />);
};

const testRenderContainer = (Component, props = {}, storeState) => {
  const store = createStore(rootReducer, storeState);

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
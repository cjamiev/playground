import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const testRenderComponent = (Component, props = {}) => {
  return render(<Component {...props} />);
};

const testRenderContainer = (Component, props = {}, reducer, storeState) => {
  const store = createStore(reducer, storeState);

  return render(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export {
  testRenderComponent,
  testRenderContainer
};
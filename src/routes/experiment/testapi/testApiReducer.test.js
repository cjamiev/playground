import { TEST_API_GET, TEST_API_POST } from './testApiActions';
import testApiReducer from './testApiReducer';

const initialState = {};

describe('testApiReducer', () => {
  it('default', () => {
    const result = testApiReducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it('TEST_API_GET', () => {
    const action = {
      type: TEST_API_GET,
      data: [1,2,3]
    };
    const result = testApiReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      value: action.data
    });
  });

  it('TEST_API_POST', () => {
    const action = {
      type: TEST_API_POST,
      data: [1,2,3]
    };
    const result = testApiReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      value: action.data
    });
  });
});
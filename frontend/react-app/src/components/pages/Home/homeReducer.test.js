import { LOAD_HOME } from './homeActions';
import homeReducer, { homeInitialState } from './homeReducer';

describe('homeReducer', () => {
  it('default', () => {
    const result = homeReducer(undefined, {});

    expect(result).toEqual(homeInitialState);
  });

  it('LOAD_HOME', () => {
    const action = {
      type: LOAD_HOME,
      data: { testKey: 'testValue', count: 0 }
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      homeData: action.data
    });
  });
});

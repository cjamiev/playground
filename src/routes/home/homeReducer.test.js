import {
  LOAD_HOME
} from './homeActions';
import homeReducer, { homeInitialState } from './homeReducer';

describe('homeReducer', () => {
  it('default', () => {
    const result = homeReducer(undefined, {});

    expect(result).toEqual(homeInitialState);
  });

  it('LOAD_HOME', () => {
    const action = {
      type: LOAD_HOME,
      data: {
        timers: [1,2,3],
        todos: [4,5,6]
      }
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      timers: action.data.timers,
      todos: action.data.todos
    });
  });
});
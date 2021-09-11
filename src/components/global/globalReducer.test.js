import { mockLocalStorage } from 'testHelper';
import {
  UPDATE_GLOBAL_TIMER,
  INITIALIZE_TIMER
} from './globalActions';
import globalReducer, { globalInitialState } from './globalReducer';

const timerOne = [
  {
    name: 'item one',
    value: {
      month: 9,
      day: 9,
      year: 2021,
      hour: 0,
      minute: 0,
      second: 0
    },
    type: 'timer'
  }
];
mockLocalStorage({
  globaltimers: JSON.stringify(timerOne)
});
describe('globalReducer', () => {
  it('default', () => {
    const result = globalReducer(undefined, {});

    expect(result).toEqual(globalInitialState);
  });

  it('UPDATE_GLOBAL_TIMER', () => {
    const action = {
      type: UPDATE_GLOBAL_TIMER,
      data: [1,2,3]
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      timers: action.data
    });
  });

  it('INITIALIZE_TIMER', () => {
    const action = {
      type: INITIALIZE_TIMER
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      initialized: true,
      timers: timerOne
    });
  });
});
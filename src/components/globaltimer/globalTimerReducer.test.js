import { mockLocalStorage } from 'testHelper';
import {
  UPDATE_GLOBAL_TIMER,
  INITIALIZE_TIMER
} from './globalTimerActions';
import globalTimerReducer, { globalTimerInitialState } from './globalTimerReducer';

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
describe('globalTimerReducer', () => {
  it('default', () => {
    const result = globalTimerReducer(undefined, {});

    expect(result).toEqual(globalTimerInitialState);
  });

  it('UPDATE_GLOBAL_TIMER', () => {
    const action = {
      type: UPDATE_GLOBAL_TIMER,
      data: [1,2,3]
    };
    const result = globalTimerReducer(globalTimerInitialState, action);

    expect(result).toEqual({
      ...globalTimerInitialState,
      timers: action.data
    });
  });

  it('INITIALIZE_TIMER', () => {
    const action = {
      type: INITIALIZE_TIMER
    };
    const result = globalTimerReducer(globalTimerInitialState, action);

    expect(result).toEqual({
      ...globalTimerInitialState,
      initialized: true,
      timers: timerOne
    });
  });
});
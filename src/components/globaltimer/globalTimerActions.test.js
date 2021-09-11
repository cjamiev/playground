import {
  UPDATE_GLOBAL_TIMER,
  updateGlobalTimer,
  INITIALIZE_TIMER,
  initializeTimer
} from './globalTimerActions';

describe('globalTimerActions', () => {
  it('updateGlobalTimer', () => {
    expect(updateGlobalTimer([1,2,3])).toEqual({ type: UPDATE_GLOBAL_TIMER, data: [1,2,3] });
  });

  it('initializeTimer', () => {
    expect(initializeTimer()).toEqual({ type: INITIALIZE_TIMER });
  });
});
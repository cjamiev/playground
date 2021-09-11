import {
  UPDATE_GLOBAL_TIMER,
  updateGlobal,
  INITIALIZE_TIMER,
  initializeTimer
} from './globalActions';

describe('globalActions', () => {
  it('updateGlobal', () => {
    expect(updateGlobal([1,2,3])).toEqual({ type: UPDATE_GLOBAL_TIMER, data: [1,2,3] });
  });

  it('initializeTimer', () => {
    expect(initializeTimer()).toEqual({ type: INITIALIZE_TIMER });
  });
});
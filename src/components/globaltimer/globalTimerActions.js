const UPDATE_GLOBAL_TIMER = 'UPDATE_GLOBAL_TIMER';
const INITIALIZE_TIMER = 'INITIALIZE_TIMER';

const updateGlobalTimer = (data) => ({ type: UPDATE_GLOBAL_TIMER, data });
const initializeTimer = () => ({ type: INITIALIZE_TIMER });

export {
  UPDATE_GLOBAL_TIMER,
  updateGlobalTimer,
  INITIALIZE_TIMER,
  initializeTimer
};
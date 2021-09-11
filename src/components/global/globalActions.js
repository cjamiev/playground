const UPDATE_GLOBAL_TIMER = 'UPDATE_GLOBAL_TIMER';
const INITIALIZE_TIMER = 'INITIALIZE_TIMER';

const updateGlobal = (data) => ({ type: UPDATE_GLOBAL_TIMER, data });
const initializeTimer = () => ({ type: INITIALIZE_TIMER });

export {
  UPDATE_GLOBAL_TIMER,
  updateGlobal,
  INITIALIZE_TIMER,
  initializeTimer
};
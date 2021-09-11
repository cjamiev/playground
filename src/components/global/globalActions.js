const UPDATE_GLOBAL_TIMER = 'UPDATE_GLOBAL_TIMER';
const INITIALIZE_TIMER = 'INITIALIZE_TIMER';

const OPEN_GLOBAL_MODAL = 'OPEN_GLOBAL_MODAL';
const CLOSE_GLOBAL_MODAL = 'CLOSE_GLOBAL_MODAL';
const SHOW_LOADING_MODAL = 'SHOW_LOADING_MODAL';
const HIDE_LOADING_MODAL = 'HIDE_LOADING_MODAL';

const OPEN_SIDE_PANEL = 'OPEN_SIDE_PANEL';
const CLOSE_SIDE_PANEL = 'CLOSE_SIDE_PANEL';

const updateGlobal = (data) => ({ type: UPDATE_GLOBAL_TIMER, data });
const initializeTimer = () => ({ type: INITIALIZE_TIMER });

const openGlobalModal = (data) => ({ type: OPEN_GLOBAL_MODAL, data });
const closeGlobalModal = (id) => ({ type: CLOSE_GLOBAL_MODAL, id });
const showLoadingModal = () => ({ type: SHOW_LOADING_MODAL });
const hideLoadingModal = () => ({ type: HIDE_LOADING_MODAL });

const openSidePanel = () => ({ type: OPEN_SIDE_PANEL });
const closeSidePanel = () => ({ type: CLOSE_SIDE_PANEL });

export {
  UPDATE_GLOBAL_TIMER,
  updateGlobal,
  INITIALIZE_TIMER,
  initializeTimer,
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL,
  openGlobalModal,
  closeGlobalModal,
  showLoadingModal,
  hideLoadingModal,
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  openSidePanel,
  closeSidePanel
};
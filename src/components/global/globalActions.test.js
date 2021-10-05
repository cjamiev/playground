import {
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
} from './globalActions';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const data = { key: 123 };

describe('globalActions', () => {
  it('updateGlobal', () => {
    expect(updateGlobal([ONE, TWO, THREE])).toEqual({ type: UPDATE_GLOBAL_TIMER, data: [ONE, TWO, THREE] });
  });

  it('initializeTimer', () => {
    expect(initializeTimer()).toEqual({ type: INITIALIZE_TIMER });
  });

  it('openGlobalModal', () => {
    const result = openGlobalModal(data);

    expect(result).toEqual({ type: OPEN_GLOBAL_MODAL, data });
  });

  it('closeGlobalModal', () => {
    const result = closeGlobalModal(ONE);

    expect(result).toEqual({ type: CLOSE_GLOBAL_MODAL, id: 1 });
  });

  it('showLoadingModal', () => {
    const result = showLoadingModal();

    expect(result).toEqual({ type: SHOW_LOADING_MODAL });
  });

  it('hideLoadingModal', () => {
    const result = hideLoadingModal();

    expect(result).toEqual({ type: HIDE_LOADING_MODAL });
  });

  it('openSidePanel', () => {
    const result = openSidePanel(data);

    expect(result).toEqual({ type: OPEN_SIDE_PANEL });
  });

  it('closeSidePanel', () => {
    const result = closeSidePanel(data);

    expect(result).toEqual({ type: CLOSE_SIDE_PANEL });
  });
});

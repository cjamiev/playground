import {
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL,
  openGlobalModal,
  closeGlobalModal,
  showLoadingModal,
  hideLoadingModal
} from './globalModalActions';

const data = { key: 123};

describe('globalModalActions', () => {
  it('openGlobalModal', () => {
    const result = openGlobalModal(data);

    expect(result).toEqual({ type: OPEN_GLOBAL_MODAL, data });
  });

  it('closeGlobalModal', () => {
    const result = closeGlobalModal(1);

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
});
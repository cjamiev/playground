import { fireEvent, screen } from '@testing-library/react';
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
import globalModalReducer from './globalModalReducer';

const initialState = {
  modalQueue: [
    {
      id: 0,
      title: 'test-title',
      message: 'test-message',
      action: jest.fn()
    },
    {
      id: 1,
      title: 'test-title1',
      message: 'test-message1',
      action: jest.fn()
    }
  ],
  isLoading: false
};

describe('globalModalReducer', () => {
  it('default', () => {
    const result = globalModalReducer(undefined, {});

    expect(result).toEqual({
      modalQueue: [],
      isLoading: false
    });
  });

  it('OPEN_GLOBAL_MODAL', () => {
    const action = {
      type: OPEN_GLOBAL_MODAL,
      data: {
        title: 'test-title2',
        message: 'test-message2',
        action: jest.fn()
      }
    };
    const result = globalModalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      modalQueue: [...initialState.modalQueue, { id: 2, ...action.data}]
    });
  });

  it('CLOSE_GLOBAL_MODAL', () => {
    const action = {
      type: CLOSE_GLOBAL_MODAL,
      id: 0
    };
    const result = globalModalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      modalQueue: [initialState.modalQueue[1]]
    });
  });

  it('CLOSE_GLOBAL_MODAL with no id', () => {
    const action = {
      type: CLOSE_GLOBAL_MODAL,
      data: {}
    };
    const result = globalModalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      modalQueue: []
    });
  });

  it('SHOW_LOADING_MODAL', () => {
    const action = {
      type: SHOW_LOADING_MODAL
    };
    const result = globalModalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('HIDE_LOADING_MODAL', () => {
    const action = {
      type: HIDE_LOADING_MODAL
    };
    const result = globalModalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: false
    });
  });
});
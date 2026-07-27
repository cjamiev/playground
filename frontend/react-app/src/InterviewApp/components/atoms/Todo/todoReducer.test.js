import {
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
} from './todoActions';
import sidePanelReducer from './sidePanelReducer';

const initialState = {
  isSidePanelOpen: false
};

describe('sidePanelReducer', () => {
  it('default', () => {
    const result = sidePanelReducer(undefined, {});

    expect(result).toEqual({
      ...initialState,
    });
  });

  it('OPEN_SIDE_PANEL', () => {
    const action = {
      type: OPEN_SIDE_PANEL
    };
    const result = sidePanelReducer(initialState, action);

    expect(result).toEqual({
      isSidePanelOpen: true
    });
  });

  it('CLOSE_SIDE_PANEL', () => {
    const action = {
      type: CLOSE_SIDE_PANEL
    };
    const result = sidePanelReducer(initialState, action);

    expect(result).toEqual({
      isSidePanelOpen: false
    });
  });
});

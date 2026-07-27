import {
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  openSidePanel,
  closeSidePanel,
} from './globalActions';

const data = { key: 123 };

describe('sidePanelActions', () => {
  it('openSidePanel', () => {
    const result = openSidePanel(data);

    expect(result).toEqual({ type: OPEN_SIDE_PANEL });
  });

  it('closeSidePanel', () => {
    const result = closeSidePanel(data);

    expect(result).toEqual({ type: CLOSE_SIDE_PANEL });
  });
});

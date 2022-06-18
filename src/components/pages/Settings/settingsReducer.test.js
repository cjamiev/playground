import { LOAD_SETTINGS } from './settingsActions';
import settingsReducer, { settingsInitialState } from './settingsReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('settingsReducer', () => {
  it('default', () => {
    const result = settingsReducer(undefined, {});

    expect(result).toEqual(settingsInitialState);
  });

  it('LOAD_SETTINGS', () => {
    const action = {
      type: LOAD_SETTINGS,
      data: {
        testKey: 'valueKey'
      }
    };
    const result = settingsReducer(settingsInitialState, action);

    expect(result).toEqual({
      ...settingsInitialState,
      data: action.data
    });
  });
});

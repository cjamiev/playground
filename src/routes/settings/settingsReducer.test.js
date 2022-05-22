import { LOAD_SETTINGS } from './configActions';
import configReducer, { configInitialState } from './configReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('configReducer', () => {
  it('default', () => {
    const result = configReducer(undefined, {});

    expect(result).toEqual(configInitialState);
  });

  it('LOAD_SETTINGS', () => {
    const action = {
      type: LOAD_SETTINGS,
      data: {
        commands: [ONE, TWO, THREE],
        links: [THREE, TWO, ONE]
      }
    };
    const result = configReducer(configInitialState, action);

    expect(result).toEqual({
      ...configInitialState,
      commands: action.data.commands,
      links: action.data.links
    });
  });
});

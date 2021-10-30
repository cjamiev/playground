import { LOAD_CONFIG } from './configActions';
import configReducer, { configInitialState } from './configReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('configReducer', () => {
  it('default', () => {
    const result = configReducer(undefined, {});

    expect(result).toEqual(configInitialState);
  });

  it('LOAD_CONFIG', () => {
    const action = {
      type: LOAD_CONFIG,
      data: {
        commands: [ONE, TWO, THREE]
      }
    };
    const result = configReducer(configInitialState, action);

    expect(result).toEqual({
      ...configInitialState,
      commands: action.data.commands
    });
  });
});

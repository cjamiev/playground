import { LOAD_GENERATOR_RECORDS } from './generatorActions';
import generatorReducer, { generatorInitialState } from './generatorReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('generatorReducer', () => {
  it('default', () => {
    const result = generatorReducer(undefined, {});

    expect(result).toEqual(generatorInitialState);
  });

  it('LOAD_GENERATOR_RECORDS', () => {
    const action = {
      type: LOAD_GENERATOR_RECORDS,
      data: [ONE, TWO, THREE]
    };
    const result = generatorReducer(generatorInitialState, action);

    expect(result).toEqual({
      ...generatorInitialState,
      generatorRecords: action.data
    });
  });
});

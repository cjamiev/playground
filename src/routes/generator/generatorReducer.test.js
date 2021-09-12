import {
  LOAD_GENERATOR_RECORDS
} from './generatorActions';
import generatorReducer, { generatorInitialState } from './generatorReducer';

describe('generatorReducer', () => {
  it('default', () => {
    const result = generatorReducer(undefined, {});

    expect(result).toEqual(generatorInitialState);
  });

  it('LOAD_GENERATOR_RECORDS', () => {
    const action = {
      type: LOAD_GENERATOR_RECORDS,
      data: [1,2,3]
    };
    const result = generatorReducer(generatorInitialState, action);

    expect(result).toEqual({
      ...generatorInitialState,
      generatorRecords: action.data
    });
  });
});
import { LOAD_{{NAME}} } from './{{name}}Actions';
import {{name}}Reducer, { {{name}}InitialState } from './{{name}}Reducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('{{name}}Reducer', () => {
  it('default', () => {
    const result = {{name}}Reducer(undefined, {});

    expect(result).toEqual({{name}}InitialState);
  });

  it('LOAD_{{NAME}}', () => {
    const action = {
      type: LOAD_{{NAME}},
      data: [ONE, TWO, THREE]
    };
    const result = {{name}}Reducer({{name}}InitialState, action);

    expect(result).toEqual({
      ...{{name}}InitialState,
      data: action.data
    });
  });
});

import { LOAD_GIT } from './gitActions';
import gitReducer, { gitInitialState } from './gitReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('gitReducer', () => {
  it('default', () => {
    const result = gitReducer(undefined, {});

    expect(result).toEqual(gitInitialState);
  });

  it('LOAD_GIT', () => {
    const action = {
      type: LOAD_GIT,
      data: [ONE, TWO, THREE]
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      data: action.data
    });
  });
});

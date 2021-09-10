import { LOAD_CLIPBOARD } from './clipboardActions';
import clipboardReducer, { clipboardInitialState } from './clipboardReducer';

describe('clipboardReducer', () => {
  it('default', () => {
    const result = clipboardReducer(undefined, {});

    expect(result).toEqual(clipboardInitialState);
  });

  it('LOAD_CLIPBOARD', () => {
    const action = {
      type: LOAD_CLIPBOARD,
      data: {
        one: [1,2,3],
        two: [4,5,6]
      }
    };
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
      clipboard: action.data
    });
  });

});
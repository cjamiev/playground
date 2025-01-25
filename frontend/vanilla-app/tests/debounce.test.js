import { TIME } from '../utils/clock';
import { debounce } from '../utils/debounce';

describe('debounce', () => {
  it('Should fire function after delayed time', () => {
    jest.useFakeTimers();

    const mockFunc = jest.fn();
    const toCall = debounce(mockFunc, TIME.A_SECOND);

    expect(mockFunc).not.toHaveBeenCalled();
    toCall();
    jest.advanceTimersByTime(TIME.A_SECOND);
    expect(mockFunc).toHaveBeenCalled();  
  });
});

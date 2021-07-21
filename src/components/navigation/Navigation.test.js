import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer, mockDate } from 'testHelper';
import Navigation from './Navigation';
import { TIME } from 'constants/time';

const mockHistory = {
  location: {
    pathname: '/home'
  },
  push: jest.fn()
};
jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(() => mockHistory)
  };
});

describe('Navigation', () => {
  it('handles click on navigation link', () => {
    testRenderContainer(Navigation);

    const navLink = screen.getByText('Experiment');
    fireEvent.click(navLink);

    expect(mockHistory.push).toHaveBeenCalledWith('/experiment');
  });

  it('check content', () => {
    jest.useFakeTimers();
    act(() => {
      mockDate();
      testRenderContainer(Navigation);
      jest.advanceTimersByTime(TIME.A_SECOND);
    });

    expect(screen.getByText('5:00:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Fri, Jan 1')).toBeInTheDocument();
    expect(screen.getByText('Week 1')).toBeInTheDocument();
  });
});
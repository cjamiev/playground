import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, fullTestWrapper, mockDate } from 'testHelper';
import Navigation from './Navigation';
import { TIME } from 'constants/time';

describe('Navigation', () => {
  it('handles click on navigation link', () => {
    const { history } = fullTestWrapper(Navigation);

    expect(history.location.pathname).toEqual('/home');

    const navLink = screen.getByText('Experiment');
    fireEvent.click(navLink);

    expect(history.location.pathname).toEqual('/experiment');
  });

  it('check content', () => {
    jest.useFakeTimers();
    act(() => {
      mockDate();
      reduxTestWrapper(Navigation);
      jest.advanceTimersByTime(TIME.A_SECOND);
    });

    expect(screen.queryByText('5:00:00 AM')).toBeInTheDocument();
    expect(screen.queryByText('Fri, Jan 1')).toBeInTheDocument();
    expect(screen.queryByText('Week 1')).toBeInTheDocument();
  });
});

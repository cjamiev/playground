import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, fullTestWrapper, mockDate, mockStore } from 'testHelper';
import Navigation from './Navigation';
import api from 'api';
import { TIME } from 'constants/time';

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    message: 'test message'
  }
});
const defaultStoreProps = {
  config: mockStore.config
};

describe('Navigation', () => {
  it('handles click on navigation link', () => {
    const { history } = fullTestWrapper(Navigation);

    expect(history.location.pathname).toEqual('/home');

    const navLink = screen.getByLabelText('Experiment Page');
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

  it('handles click on a command', () => {
    reduxTestWrapper(Navigation, {}, defaultStoreProps);

    const commandLink = screen.getByText('Commands');
    fireEvent.click(commandLink);
    fireEvent.click(screen.getByText('commandLabelOne'));

    expect(api.get).toHaveBeenCalledWith(`/command?name=commandOne&args=${undefined}`);
  });

  it('handles click on external link', () => {
    window.open = jest.fn();
    reduxTestWrapper(Navigation, {}, defaultStoreProps);

    const eLink = screen.getByText('Links');
    fireEvent.click(eLink);
    fireEvent.click(screen.getByText('linkLabelOne'));

    expect(window.open).toHaveBeenCalledWith('linkOne', '_blank');
  });
});

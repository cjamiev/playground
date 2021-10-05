import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, fullTestWrapper, mockLocalStorage } from 'testHelper';
import Global from 'components/Global';
import { closeGlobal } from './globalActions';
import { TIME } from 'constants/time';
import { ROUTES } from 'constants/routes';

const ZERO = 0;

const defaultStore = {
  global: {
    isLoading: false,
    modalQueue: [],
    timers: [],
    initialized: false
  }
};
const storeWithPopulatedModalQueue = {
  global: {
    isLoading: false,
    modalQueue: [
      {
        id: 0,
        title: 'test-title',
        message: 'test-message',
        buttonList: [
          {
            label: 'Save',
            action: jest.fn()
          }
        ]
      }
    ],
    timers: [],
    initialized: false
  }
};
const storeWithLoading = {
  global: {
    isLoading: true,
    modalQueue: [],
    timers: [],
    initialized: false
  }
};

mockLocalStorage({
  globaltimers: JSON.stringify([
    {
      name: 'item one',
      value: {
        month: 9,
        day: 9,
        year: 2021,
        hour: 0,
        minute: 0,
        second: 0
      },
      type: 'timer'
    },
    {
      name: 'item two',
      value: {
        month: 1,
        day: 1,
        year: 2030,
        hour: 0,
        minute: 0,
        second: 0
      },
      type: 'timer'
    }
  ])
});

const TestComponent = () => {
  return <span>dummy</span>;
};

describe('Global', () => {
  jest.useFakeTimers();

  it('handle timers', () => {
    fullTestWrapper(TestComponent, {}, {}, ROUTES.HOME.url, true);
    jest.advanceTimersByTime(TIME.A_SECOND);

    expect(screen.getByText('Time\'s up for "item one"')).toBeInTheDocument();
  });

  it('empty modalQueue', () => {
    const { container } = reduxTestWrapper(Global, {}, defaultStore, '/home', false);

    expect(container).toBeEmptyDOMElement();
  });

  it('click primary action', () => {
    reduxTestWrapper(Global, {}, storeWithPopulatedModalQueue, '/home', false);

    fireEvent.click(screen.getByText('Save'));

    expect(storeWithPopulatedModalQueue.global.modalQueue[ZERO].buttonList[ZERO].action).toHaveBeenCalled();
  });

  it('click close', () => {
    reduxTestWrapper(Global, {}, storeWithPopulatedModalQueue, '/home', false);

    expect(screen.getByText(storeWithPopulatedModalQueue.global.modalQueue[ZERO].message)).toBeInTheDocument();
    fireEvent.click(screen.getByText('X'));

    expect(screen.queryByText(storeWithPopulatedModalQueue.global.modalQueue[ZERO].message)).not.toBeInTheDocument();
  });

  it('show loading', () => {
    reduxTestWrapper(Global, {}, storeWithLoading, '/home', false);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

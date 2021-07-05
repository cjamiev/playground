import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import { executeCommand } from './listActions';
import { incrementDate } from 'clock';
import List from './List';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const ZERO = 0;
const today = new Date();
const linkData = {
  type: 'link',
  label: 'cjamiev/playground',
  value: 'https://github.com/cjamiev/playground'
};
const textData = {
  type: 'text',
  value: 'testing123'
};
const copyData = {
  type: 'copy',
  label: 'username',
  value: 'cjamiev1836'
};
const commandData = {
  type: 'command',
  label: 'test-command',
  value: { mode: 'test-mode', name: 'test-filename', argsId: 'test-argsId'}
};
const timerOneHourData = {
  type: 'timer',
  label: 'One hour from now',
  value: incrementDate(today, { hours: 1})
};
const timerTwoDaysData = {
  type: 'timer',
  label: 'Two days from now',
  value: incrementDate(today, { days: 2})
};
const timerTwoWeeksData = {
  type: 'timer',
  label: 'Two weeks from now',
  value: incrementDate(today, { weeks: 2})
};
const invalidTypeData = {
  type: 'invalid',
  label: 'invalid-label'
};
const defaultProps = {
  header: 'List',
  data: [[
    linkData,
    textData
  ],
  [
    copyData
  ],
  [
    commandData
  ],
  [
    timerOneHourData,
    timerTwoDaysData,
    timerTwoWeeksData
  ],
  [invalidTypeData]]
};

describe('List', () => {
  it('checks each type successfully renders', () => {
    document.execCommand = jest.fn();
    testRenderComponent(List, defaultProps);

    const copyBtn = screen.getByText(copyData.label);
    fireEvent.click(copyBtn);

    const commandBtn = screen.getByText(commandData.label);
    fireEvent.click(commandBtn);

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.getByText(linkData.label)).toBeInTheDocument();
    expect(screen.getByText(textData.value)).toBeInTheDocument();
    expect(screen.getByText(copyData.label)).toBeInTheDocument();
    expect(screen.getByText(commandData.label)).toBeInTheDocument();
    expect(screen.getByText(timerOneHourData.label)).toBeInTheDocument();
    expect(screen.getByText(timerTwoDaysData.label)).toBeInTheDocument();
    expect(screen.getByText(timerTwoWeeksData.label)).toBeInTheDocument();
    expect(screen.queryByText(invalidTypeData.label)).not.toBeInTheDocument();
  });
});
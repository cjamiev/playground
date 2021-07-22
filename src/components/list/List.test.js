import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper, reduxTestWrapper } from 'testHelper';
import { executeCommand } from './listActions';
import { incrementDate } from 'clock';
import api from 'api';
import List from './List';

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

const ZERO = 0;
const today = new Date();
const getProps = (entry) => {
  return {
    header: 'List',
    data: [[entry]]
  };
};

describe('List', () => {
  it('invalid type', () => {
    const invalidTypeData = {
      type: 'invalid',
      label: 'invalid-label'
    };
    simpleTestWrapper(List, getProps(invalidTypeData));

    expect(screen.queryByText(invalidTypeData.label)).not.toBeInTheDocument();
  });

  it('type link', () => {
    const linkData = {
      type: 'link',
      label: 'cjamiev/playground',
      value: 'https://github.com/cjamiev/playground'
    };
    simpleTestWrapper(List, getProps(linkData));

    expect(screen.getByText(linkData.label)).toBeInTheDocument();
  });

  it('type copy', () => {
    const copyData = {
      type: 'copy',
      label: 'username',
      value: 'cjamiev1836'
    };
    document.execCommand = jest.fn();
    simpleTestWrapper(List, getProps(copyData));

    const copyBtn = screen.getByText(copyData.label);
    fireEvent.click(copyBtn);

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(screen.getByText(copyData.label)).toBeInTheDocument();
  });

  it('type text', () => {
    const textData = {
      type: 'text',
      value: 'testing123'
    };
    simpleTestWrapper(List, getProps(textData));

    expect(screen.getByText(textData.value)).toBeInTheDocument();
  });

  it('type command', () => {
    const commandData = {
      type: 'command',
      label: 'test-command',
      value: { mode: 'test-mode', name: 'test-filename', showArgs: true}
    };
    const args = '12345';
    reduxTestWrapper(List, getProps(commandData));

    const commandInput = screen.getByLabelText(`args for ${commandData.label}`);
    fireEvent.change(commandInput, { target: { value: args }});

    const commandBtn = screen.getByText(commandData.label);
    fireEvent.click(commandBtn);

    expect(api.get).toHaveBeenCalledWith(`/command?mode=${commandData.value.mode}&file=${commandData.value.name}&args=${args}`);
    expect(screen.getByText(commandData.label)).toBeInTheDocument();
  });

  it('type timer - One hour from now', () => {
    const timerOneHourData = {
      type: 'timer',
      label: 'One hour from now',
      value: incrementDate(today, { hours: 1})
    };
    simpleTestWrapper(List, getProps(timerOneHourData));

    expect(screen.getByText(timerOneHourData.label)).toBeInTheDocument();
  });

  it('type timer - Two days from now', () => {
    const timerTwoDaysData = {
      type: 'timer',
      label: 'Two days from now',
      value: incrementDate(today, { days: 2})
    };
    simpleTestWrapper(List, getProps(timerTwoDaysData));

    expect(screen.getByText(timerTwoDaysData.label)).toBeInTheDocument();
  });

  it('type timer - Two weeks from now', () => {
    const timerTwoWeeksData = {
      type: 'timer',
      label: 'Two weeks from now',
      value: incrementDate(today, { weeks: 2})
    };
    simpleTestWrapper(List, getProps(timerTwoWeeksData));

    expect(screen.getByText(timerTwoWeeksData.label)).toBeInTheDocument();
  });
});
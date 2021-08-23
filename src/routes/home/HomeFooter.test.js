import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper, mockLocalStorage } from 'testHelper';
import HomeFooter from './HomeFooter';

const today = new Date();
const ZERO = 0;
const ONE = 1;
const pathname = '/generator';
const cachedClipboard = [
  {
    name: 'test',
    value: '123',
    type: 'copy'
  },
  {
    name: 'Next Hour',
    value: {
      month: today.getMonth() + ONE,
      day: today.getDate(),
      year: today.getFullYear(),
      hour: today.getHours() + ONE,
      minute: today.getMinutes(),
      second: today.getSeconds()
    },
    type: 'timer'
  }
];
mockLocalStorage({
  clipboard: JSON.stringify(cachedClipboard)
});

describe('HomeFooter', () => {
  it('Render cached clipboard', () => {
    document.execCommand = jest.fn();
    simpleTestWrapper(HomeFooter, {});

    const copyBtn = screen.getByText(cachedClipboard[ZERO].name);
    const timerBtn = screen.getByText(cachedClipboard[ONE].name);

    fireEvent.click(copyBtn);

    expect(copyBtn).toBeInTheDocument();
    expect(timerBtn).toBeInTheDocument();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('Handle add clip', () => {
    simpleTestWrapper(HomeFooter, {});

    const addClipBtn = screen.getByText('Add Clip');
    fireEvent.click(addClipBtn);

    const nameField = screen.getByLabelText('Name text field');
    const valueField = screen.getByLabelText('Value text area');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(nameField, { target: { value: 'Name1' } });
    fireEvent.change(valueField, { target: { value: 'Value1' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Name1')).toBeInTheDocument();
  });

  it('Handle add timer', () => {
    simpleTestWrapper(HomeFooter, {});

    const addTimerBtn = screen.getByText('Add Timer');
    fireEvent.click(addTimerBtn);

    const nameField = screen.getByLabelText('Name text field');
    const secondField = screen.getByLabelText('Second text field');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(nameField, { target: { value: 'Timer1' } });
    fireEvent.change(secondField, { target: { value: '1' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Timer1')).toBeInTheDocument();
  });

  it('Handle remove', () => {
    simpleTestWrapper(HomeFooter, {});

    const removeBtn = screen.getByText('Remove');
    const copyField = screen.getByText('test');
    const timerField = screen.getByText('Next Hour');

    fireEvent.click(removeBtn);
    fireEvent.click(copyField);
    fireEvent.click(removeBtn);
    fireEvent.click(timerField);

    expect(screen.queryByText('test')).not.toBeInTheDocument();
    expect(screen.queryByText('Next Hour')).not.toBeInTheDocument();
  });
});
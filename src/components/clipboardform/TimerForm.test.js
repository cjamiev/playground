import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import TimerForm from './TimerForm';

const defaultProps = {
  onChange: jest.fn()
};

describe('TimerForm', () => {
  it('Handle form', () => {
    simpleTestWrapper(TimerForm, defaultProps);

    const nameField = screen.getByLabelText('Name text field');
    const monthField = screen.getByLabelText('Month text field');
    const dayField = screen.getByLabelText('Day text field');
    const yearField = screen.getByLabelText('Year text field');
    const hourField = screen.getByLabelText('Hour text field');
    const minuteField = screen.getByLabelText('Minute text field');
    const secondField = screen.getByLabelText('Second text field');
    const saveBtn = screen.getByText('Save');

    fireEvent.change(nameField, { target: { value: 'Timer1' } });
    fireEvent.change(monthField, { target: { value: '1' } });
    fireEvent.change(dayField, { target: { value: '2' } });
    fireEvent.change(yearField, { target: { value: '3' } });
    fireEvent.change(hourField, { target: { value: '4' } });
    fireEvent.change(minuteField, { target: { value: '5' } });
    fireEvent.change(secondField, { target: { value: '6' } });
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({ name: 'Timer1', content: { month: 1, day: 2, year: 3, hour: 4, minute: 5, second: 6 }});
  });

  it('Handle form with pm mode', () => {
    simpleTestWrapper(TimerForm, defaultProps);

    const nameField = screen.getByLabelText('Name text field');
    const monthField = screen.getByLabelText('Month text field');
    const dayField = screen.getByLabelText('Day text field');
    const yearField = screen.getByLabelText('Year text field');
    const hourField = screen.getByLabelText('Hour text field');
    const minuteField = screen.getByLabelText('Minute text field');
    const secondField = screen.getByLabelText('Second text field');
    const pmSwitch = screen.getByLabelText('pm mode is off');
    const saveBtn = screen.getByText('Save');

    fireEvent.change(nameField, { target: { value: 'Timer1' } });
    fireEvent.change(monthField, { target: { value: '1' } });
    fireEvent.change(dayField, { target: { value: '2' } });
    fireEvent.change(yearField, { target: { value: '3' } });
    fireEvent.change(hourField, { target: { value: '4' } });
    fireEvent.change(minuteField, { target: { value: '5' } });
    fireEvent.change(secondField, { target: { value: '6' } });
    fireEvent.click(pmSwitch);
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({ name: 'Timer1', content: { month: 1, day: 2, year: 3, hour: 16, minute: 5, second: 6 }});
  });
});
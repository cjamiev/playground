import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import CommandForm from './CommandForm';

const defaultProps = {
  onChange: jest.fn()
};

describe('CommandForm', () => {
  it('Handle form', () => {
    simpleTestWrapper(CommandForm, defaultProps);
    const nameField = screen.getByLabelText('Name text field');
    const valueField = screen.getByLabelText('Command File Name text field');
    const detachModeOption = screen.getByText('detach');
    const saveBtn = screen.getByText('Save');

    fireEvent.change(nameField, { target: { value: 'Name1' } });
    fireEvent.change(valueField, { target: { value: 'Command1' } });
    fireEvent.click(detachModeOption);
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({ name: 'Name1', content: { name:'Command1', mode: 'detach'}});
  });
});
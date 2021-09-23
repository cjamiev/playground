import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Home from './Home';
import { incrementDate } from 'clock';
const pathname = '/home';
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const TWELVE = 12;
const today = new Date();

describe('Home', () => {
  it('handle tasks', () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    expect(screen.getByText('No tasks to display')).toBeInTheDocument();

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    // Add tasks
    const taskField = screen.getByLabelText('Task text field');
    const notesField = screen.getByLabelText('Notes text field');
    const urlField = screen.getByLabelText('URL text field');
    const addBtn = screen.getByText('Add Item');

    fireEvent.change(taskField, { target: { value: 'taskOne' } });
    fireEvent.change(notesField, { target: { value: 'noteOne' } });
    fireEvent.change(urlField, { target: { value: 'urlOne' } });
    fireEvent.click(addBtn);
    fireEvent.change(taskField, { target: { value: 'taskTwo' } });
    fireEvent.change(notesField, { target: { value: 'noteTwo' } });
    fireEvent.change(urlField, { target: { value: 'urlTwo' } });
    fireEvent.click(addBtn);
    fireEvent.change(taskField, { target: { value: 'taskThree' } });
    fireEvent.change(notesField, { target: { value: 'noteThree' } });
    fireEvent.change(urlField, { target: { value: 'urlThree' } });
    fireEvent.click(addBtn);

    expect(screen.getByText('taskOne')).toBeInTheDocument();
    expect(screen.getByText('noteOne')).toBeInTheDocument();
    expect(screen.getByText('urlOne')).toBeInTheDocument();
    expect(screen.getByText('taskTwo')).toBeInTheDocument();
    expect(screen.getByText('noteTwo')).toBeInTheDocument();
    expect(screen.getByText('urlTwo')).toBeInTheDocument();
    expect(screen.getByText('taskThree')).toBeInTheDocument();
    expect(screen.getByText('noteThree')).toBeInTheDocument();
    expect(screen.getByText('urlThree')).toBeInTheDocument();

    // Remove task
    const downBtn = screen.getAllByLabelText('down arrow')[ZERO];
    fireEvent.click(downBtn);
    const upBtn = screen.getAllByLabelText('up arrow')[TWO];
    fireEvent.click(upBtn);

    const doneBtn = screen.getAllByLabelText('trash')[ONE];
    fireEvent.click(doneBtn);

    expect(screen.getByText('taskOne')).toBeInTheDocument();
    expect(screen.getByText('taskTwo')).toBeInTheDocument();
    expect(screen.queryByText('taskThree')).not.toBeInTheDocument();
    expect(screen.queryByText('No items to display')).not.toBeInTheDocument();
  });

  it('handle timer', () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    const timersBtn = screen.getByText('Timers');
    fireEvent.click(timersBtn);

    expect(screen.getByText('No timers to display')).toBeInTheDocument();

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    const timerField = screen.getByLabelText('Name text field');
    const saveBtn = screen.getByText('Save');

    // Add timers
    fireEvent.change(timerField, { target: { value: 'timerOne' } });
    fireEvent.click(saveBtn);
    fireEvent.change(timerField, { target: { value: 'timerTwo' } });
    fireEvent.click(saveBtn);
    fireEvent.change(timerField, { target: { value: 'timerThree' } });
    fireEvent.click(saveBtn);

    expect(screen.getByText('timerOne')).toBeInTheDocument();
    expect(screen.getByText('timerTwo')).toBeInTheDocument();
    expect(screen.getByText('timerThree')).toBeInTheDocument();

    // Remove timer
    const removeBtn = screen.getAllByLabelText('trash')[ONE];
    fireEvent.click(removeBtn);

    expect(screen.getByText('timerOne')).toBeInTheDocument();
    expect(screen.getByText('timerThree')).toBeInTheDocument();
    expect(screen.queryByText('timerTwo')).not.toBeInTheDocument();
    expect(screen.queryByText('No timers to display')).not.toBeInTheDocument();

    // Edit timer to be one minute from now (this test is hard design in a useful way)
    fireEvent.click(sidePanelBtn);

    expect(screen.queryByLabelText('Name text field')).not.toBeInTheDocument();

    const editBtn = screen.getAllByText('Edit')[ZERO];
    fireEvent.click(editBtn);

    expect(screen.queryByLabelText('Name text field')).toBeInTheDocument();
    const minuteField = screen.getByLabelText('Minute text field');
    const oneMinuteFromNow = incrementDate(today, { minutes: 1 }).getMinutes();

    fireEvent.change(minuteField, { target: { value: oneMinuteFromNow } });
    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByTestId('timerOne time')).toHaveTextContent('0:0');
  });
});
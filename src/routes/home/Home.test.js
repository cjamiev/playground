import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockGet, mockPost, mockApi } from 'testHelper';
import Home from './Home';
import { incrementDate } from 'clock';
import { TIME } from 'constants/time';

const pathname = '/home';
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const TWELVE = 12;
const today = new Date();

mockApi(mockGet, mockPost);

describe('Home', () => {
  it('handle tasks', () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    expect(screen.queryByText('No tasks to display')).toBeInTheDocument();

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    // Add tasks
    const taskField = screen.getByLabelText('Task text field');
    const noteField = screen.getByLabelText('Note text field');
    const urlField = screen.getByLabelText('Url text field');
    const addBtn = screen.getByText('Save Task');

    fireEvent.change(taskField, { target: { value: 'taskOne' } });
    fireEvent.change(noteField, { target: { value: 'noteOne' } });
    fireEvent.click(screen.getByLabelText('plus'));
    fireEvent.change(urlField, { target: { value: 'urlOne' } });
    fireEvent.click(screen.getByLabelText('plus'));
    fireEvent.click(addBtn);

    fireEvent.change(taskField, { target: { value: 'taskTwo' } });
    fireEvent.change(noteField, { target: { value: 'noteTwo' } });
    fireEvent.click(screen.getByLabelText('plus'));
    fireEvent.change(urlField, { target: { value: 'urlTwo' } });
    fireEvent.click(screen.getByLabelText('plus'));
    fireEvent.click(addBtn);

    fireEvent.change(taskField, { target: { value: 'taskThree' } });
    fireEvent.change(noteField, { target: { value: 'noteThree' } });
    fireEvent.click(screen.getByLabelText('plus'));
    fireEvent.change(urlField, { target: { value: 'urlThree' } });
    fireEvent.click(screen.getByLabelText('plus'));
    fireEvent.click(addBtn);

    expect(screen.queryByText('taskOne')).toBeInTheDocument();
    expect(screen.queryByText('noteOne')).toBeInTheDocument();
    expect(screen.queryByText('urlOne')).toBeInTheDocument();

    expect(screen.queryByText('taskTwo')).toBeInTheDocument();
    expect(screen.queryByText('noteTwo')).toBeInTheDocument();
    expect(screen.queryByText('urlTwo')).toBeInTheDocument();

    expect(screen.queryByText('taskThree')).toBeInTheDocument();
    expect(screen.queryByText('noteThree')).toBeInTheDocument();
    expect(screen.queryByText('urlThree')).toBeInTheDocument();

    // Remove task
    const downBtn = screen.getAllByLabelText('down arrow')[ZERO];
    fireEvent.click(downBtn);
    const upBtn = screen.getAllByLabelText('up arrow')[TWO];
    fireEvent.click(upBtn);

    const doneBtn = screen.getAllByLabelText('trash')[ONE];
    fireEvent.click(doneBtn);

    expect(screen.queryByText('taskOne')).toBeInTheDocument();
    expect(screen.queryByText('taskTwo')).toBeInTheDocument();
    expect(screen.queryByText('taskThree')).not.toBeInTheDocument();
    expect(screen.queryByText('No items to display')).not.toBeInTheDocument();
  });

  it('handle edit tasks', async () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    await waitFor(() => {
      expect(screen.queryByText('todoOne')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByLabelText('edit')[ZERO]);

    expect(screen.getAllByText('noteOne')).toHaveLength(TWO);
    expect(screen.getAllByText('noteTwo')).toHaveLength(TWO);
    expect(screen.getAllByText('urlOne')).toHaveLength(TWO);
    expect(screen.getAllByText('urlTwo')).toHaveLength(TWO);

    fireEvent.click(screen.getAllByLabelText('minus')[ZERO]);

    fireEvent.click(screen.getByText('Save Task'));

    expect(screen.queryByText('noteOne')).not.toBeInTheDocument();
    expect(screen.getAllByText('noteTwo')).toHaveLength(ONE);
  });

  it('handle timer', () => {
    jest.useFakeTimers();
    reduxTestWrapper(Home, {}, {}, pathname);

    const timersBtn = screen.getByText('Timers');
    fireEvent.click(timersBtn);

    expect(screen.queryByText('No timers to display')).toBeInTheDocument();

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

    expect(screen.queryByText('timerOne')).toBeInTheDocument();
    expect(screen.queryByText('timerTwo')).toBeInTheDocument();
    expect(screen.queryByText('timerThree')).toBeInTheDocument();

    // Remove timer
    const removeBtn = screen.getAllByLabelText('trash')[ONE];
    fireEvent.click(removeBtn);

    expect(screen.queryByText('timerOne')).toBeInTheDocument();
    expect(screen.queryByText('timerThree')).toBeInTheDocument();
    expect(screen.queryByText('timerTwo')).not.toBeInTheDocument();
    expect(screen.queryByText('No timers to display')).not.toBeInTheDocument();

    // Edit timer to be one minute from now (this test is hard design in a useful way)
    fireEvent.click(sidePanelBtn);
    jest.advanceTimersByTime(TIME.A_SECOND);

    expect(screen.queryByLabelText('Name text field')).not.toBeInTheDocument();

    const editBtn = screen.getAllByLabelText('edit')[ZERO];
    fireEvent.click(editBtn);

    expect(screen.queryByLabelText('Name text field')).toBeInTheDocument();
    const minuteField = screen.getByLabelText('Minute text field');
    const oneMinuteFromNow = incrementDate(today, { minutes: 1 }).getMinutes();

    fireEvent.change(minuteField, { target: { value: oneMinuteFromNow } });
    fireEvent.click(screen.getByText('Save'));

    expect(screen.queryByTestId('timerOne time')).toHaveTextContent('0:0');
  });
});

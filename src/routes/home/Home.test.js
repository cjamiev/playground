import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Home from './Home';

const pathname = '/home';
const ZERO = 0;
const ONE = 1;
const TWO = 2;

describe('Home', () => {
  it('handle tasks', () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    expect(screen.getByText('No tasks to display')).toBeInTheDocument();

    const sidePanelBtn = screen.getByText('(|)');
    fireEvent.click(sidePanelBtn);

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

    const downBtn = screen.getAllByText('Down')[ZERO];
    fireEvent.click(downBtn);
    const upBtn = screen.getAllByText('Up')[TWO];
    fireEvent.click(upBtn);

    const doneBtn = screen.getAllByText('Remove')[ONE];
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

    const sidePanelBtn = screen.getByText('(|)');
    fireEvent.click(sidePanelBtn);

    const timerField = screen.getByLabelText('Name text field');
    const saveBtn = screen.getByText('Save');

    fireEvent.change(timerField, { target: { value: 'timerOne' } });
    fireEvent.click(saveBtn);
    fireEvent.change(timerField, { target: { value: 'timerTwo' } });
    fireEvent.click(saveBtn);
    fireEvent.change(timerField, { target: { value: 'timerThree' } });
    fireEvent.click(saveBtn);

    expect(screen.getByText('timerOne')).toBeInTheDocument();
    expect(screen.getByText('timerTwo')).toBeInTheDocument();
    expect(screen.getByText('timerThree')).toBeInTheDocument();

    const doneBtn = screen.getAllByText('Remove')[ONE];
    fireEvent.click(doneBtn);

    expect(screen.getByText('timerOne')).toBeInTheDocument();
    expect(screen.getByText('timerThree')).toBeInTheDocument();
    expect(screen.queryByText('timerTwo')).not.toBeInTheDocument();
    expect(screen.queryByText('No timers to display')).not.toBeInTheDocument();
  });
});
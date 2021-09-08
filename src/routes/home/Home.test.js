import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Home from './Home';

const pathname = '/home';
const ZERO = 0;
const ONE = 1;
const TWO = 2;

describe('Home', () => {
  it('handle todo list', () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    const textField = screen.getByLabelText('Enter to do item text field');
    const addBtn = screen.getByText('Add Item');

    fireEvent.change(textField, { target: { value: 'itemOne' } });
    fireEvent.click(addBtn);
    fireEvent.change(textField, { target: { value: 'itemTwo' } });
    fireEvent.click(addBtn);
    fireEvent.change(textField, { target: { value: 'itemThree' } });
    fireEvent.click(addBtn);

    expect(screen.getByText('itemOne')).toBeInTheDocument();
    expect(screen.getByText('itemTwo')).toBeInTheDocument();
    expect(screen.getByText('itemThree')).toBeInTheDocument();

    const downBtn = screen.getAllByText('Dwn')[ZERO];
    fireEvent.click(downBtn);
    const upBtn = screen.getAllByText('Up')[TWO];
    fireEvent.click(upBtn);

    const doneBtn = screen.getAllByText('Remove')[ONE];
    fireEvent.click(doneBtn);

    expect(screen.getByText('itemOne')).toBeInTheDocument();
    expect(screen.getByText('itemTwo')).toBeInTheDocument();
    expect(screen.queryByText('itemThree')).not.toBeInTheDocument();
  });
});
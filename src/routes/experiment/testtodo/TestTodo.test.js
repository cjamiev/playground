import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import TestTodo from './TestTodo';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const defaultProps = {};

describe('TestTodo', () => {
  it('adds three items', () => {
    testRenderComponent(TestTodo, defaultProps);

    const inputNode = screen.getByRole('textbox');

    fireEvent.change(inputNode, { target: { value: 'item1' } });
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.change(inputNode, { target: { value: 'item2' } });
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.change(inputNode, { target: { value: 'item3' } });
    fireEvent.click(screen.getByText('Add Item'));

    const item2DoneBtn = screen.getAllByText('Done')[ONE];
    const item3MoveUpBtn = screen.getAllByText('Move Item Up')[TWO];
    const item1MoveDownBtn = screen.getAllByText('Move Item Down')[ZERO];

    fireEvent.click(item3MoveUpBtn);
    fireEvent.click(item1MoveDownBtn);
    fireEvent.click(item2DoneBtn);

    const todoList = screen.getAllByText(/item/);

    expect(todoList.length).toBe(TWO);
    todoList.forEach((item,index) => {
      if(index === ZERO){
        expect(item.textContent).toBe('item3');
      }
      if(index === ONE){
        expect(item.textContent).toBe('item1');
      }
    });
  });
});
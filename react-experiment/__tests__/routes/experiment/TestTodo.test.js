import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import TestTodo from 'routes/experiment/testtodo';

const defaultProps = {};

describe('TestTodo', () => {
  it('adds three items', () => {
    const { getByText, getAllByText } = testRenderComponent(TestTodo, defaultProps);

    const inputNode = screen.getByRole('textbox');

    fireEvent.change(inputNode, { target: { value: 'item1' } });
    fireEvent.click(getByText('Add Item'));
    fireEvent.change(inputNode, { target: { value: 'item2' } });
    fireEvent.click(getByText('Add Item'));
    fireEvent.change(inputNode, { target: { value: 'item3' } });
    fireEvent.click(getByText('Add Item'));

    const item2DoneBtn = getAllByText('Done')[1];
    const item3MoveUpBtn = getAllByText('Move Item Up')[2];
    const item1MoveDownBtn = getAllByText('Move Item Down')[0];

    fireEvent.click(item3MoveUpBtn);
    fireEvent.click(item1MoveDownBtn);
    fireEvent.click(item2DoneBtn);

    const todoList = getAllByText(/item/);

    expect(todoList.length).toBe(2);
    todoList.forEach((item,index) => {
      if(index === 0){
        expect(item.textContent).toBe('item3');
      }
      if(index === 1){
        expect(item.textContent).toBe('item1');
      }
    });
  });
});
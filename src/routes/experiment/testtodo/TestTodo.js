import React, { useState } from 'react';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';
import Button from 'components/button';

const TodoList = ({ items, removeItem, moveItemUp, moveItemDown }) => {
  return (
    <ul data-testid='todo-list'>
      {items.map((item) => (
        <div key={item.id} data-testid={item.text}>
          <span>{item.text}</span>
          <Button label="Done" onClick={() => { removeItem(item.id); }} />
          <Button label="Move Up" onClick={() => { moveItemUp(item.id); }} />
          <Button label="Move Down" onClick={() => { moveItemDown(item.id);}} />
        </div>
      ))}
    </ul>
  );
};

const TestTodo = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!text.length) {
      return;
    }

    const newItem = {
      text,
      id: Date.now()
    };

    const updatedItems = items.concat(newItem);
    setItems(updatedItems);
    setText('');
  };

  const removeItem = id => {
    const updatedItems = items.filter(item => item.id !== id);

    setItems(updatedItems);
  };

  const moveItemUp = id => {
    const index = items.findIndex(item => item.id === id);
    const updatedItems = decrementElementIndex(items, index);

    setItems(updatedItems);
  };

  const moveItemDown = id => {
    const index = items.findIndex((item) => item.id === id);
    const updatedItems = incrementElementIndex(items, index);

    setItems(updatedItems);
  };

  return (
    <div className="container--center">
      <h2>TODO</h2>
      <TodoList
        items={items}
        removeItem={removeItem}
        moveItemUp={moveItemUp}
        moveItemDown={moveItemDown}
      />
      <input data-testid="todo-in" type="text" value={text} onChange={handleChange} />
      <Button data-testid="todo-add-btn" label="Add Item" onClick={addItem} />
    </div>
  );
};

export default TestTodo;
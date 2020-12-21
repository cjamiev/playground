import React, { useState } from 'react';

const ZERO = 0;
const ONE = 1;

const swapArrayElementPositions = (oldArray, indexA, indexB) => {
  if (indexA < ZERO || indexB < ZERO || indexA >= oldArray.length || indexB >= oldArray.length) {
    return oldArray;
  }

  const newArray = oldArray.slice();
  const tempItem = oldArray[indexA];
  newArray[indexA] = oldArray[indexB];
  newArray[indexB] = tempItem;

  return newArray;
};

const decrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index - ONE);
};

const incrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index + ONE);
};

const TodoList = ({ items, removeItem, moveItemUp, moveItemDown }) => (
  <ul>
    {items.map((item) => (
      <div key={item.id}>
        <li>{item.text}</li>
        <button
          onClick={() => {
            removeItem(item.id);
          }}
        >
          Done
        </button>

        <button
          onClick={() => {
            moveItemUp(item.id);
          }}
        >
          Move Item Up
        </button>
        <button
          onClick={() => {
            moveItemDown(item.id);
          }}
        >
          Move Item down
        </button>
      </div>
    ))}
  </ul>
);

const Todo = (props) => {
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

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => {
      return item.id !== id;
    });

    setItems(updatedItems);
  };

  const moveItemUp = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const updatedItems = decrementElementIndex(items, index);

    setItems(updatedItems);
  };

  const moveItemDown = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const updatedItems = incrementElementIndex(items, index);

    setItems(updatedItems);
  };

  return (
    <>
      <h3>TODO</h3>
      <TodoList
        items={items}
        removeItem={removeItem}
        moveItemUp={moveItemUp}
        moveItemDown={moveItemDown}
      />
      <input id="new-todo" onChange={handleChange} value={text} />
      <button onClick={addItem}>Add Item</button>
    </>
  );
};

export default Todo;
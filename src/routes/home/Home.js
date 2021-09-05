import React, { useState } from 'react';
import Page from 'components/layout';
import HomeFooter from './HomeFooter';
import Button from 'components/button';
import Text from 'components/form/Text';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';
import './home.css';

const TodoList = ({ items, removeItem, moveItemUp, moveItemDown }) => {
  return (
    <ul data-testid='todo-list'>
      {items.map((item) => (
        <div key={item.id} data-testid={item.text}>
          <Button isSmall label="X" onClick={() => { removeItem(item.id); }} />
          <Button isSmall label="Up" onClick={() => { moveItemUp(item.id); }} />
          <Button isSmall label="Dwn" onClick={() => { moveItemDown(item.id);}} />
          <span>{item.text} </span>
        </div>
      ))}
    </ul>
  );
};

const Home = () => {
  const currentTodo = JSON.parse(localStorage.getItem('todo') || '[]');
  const [items, setItems] = useState(currentTodo);
  const [text, setText] = useState('');

  const handleChange = ({selected}) => {
    setText(selected);
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
    localStorage.setItem('todo', JSON.stringify(updatedItems));
  };

  const removeItem = id => {
    const updatedItems = items.filter(item => item.id !== id);

    setItems(updatedItems);
    localStorage.setItem('todo', JSON.stringify(updatedItems));
  };

  const moveItemUp = id => {
    const index = items.findIndex(item => item.id === id);
    const updatedItems = decrementElementIndex(items, index);

    setItems(updatedItems);
    localStorage.setItem('todo', JSON.stringify(updatedItems));
  };

  const moveItemDown = id => {
    const index = items.findIndex((item) => item.id === id);
    const updatedItems = incrementElementIndex(items, index);

    setItems(updatedItems);
    localStorage.setItem('todo', JSON.stringify(updatedItems));
  };

  return (
    <Page footerComponent={HomeFooter()}>
      <Text data-testid="todo-in" placeholder='Enter to do item' selected={text} onChange={handleChange} />
      <Button isSmall data-testid="todo-add-btn" label="+" onClick={addItem} />
      <TodoList
        items={items}
        removeItem={removeItem}
        moveItemUp={moveItemUp}
        moveItemDown={moveItemDown}
      />
    </Page>
  );
};

export default Home;

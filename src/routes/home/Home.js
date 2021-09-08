import React, { useState } from 'react';
import Page from 'components/layout';
import HomeFooter from './HomeFooter';
import Button from 'components/button';
import Text from 'components/form/Text';
import Table from 'components/table';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';
import './home.css';

const ZERO = 0;

const renderCells = ({ items, removeItem, moveItemUp, moveItemDown }) => {
  return (
    <>
      {items.map((item) => (
        <tr className='flex--horizontal' key={item.id} data-testid={item.text}>
          <td className='flex--three'>{item.text}</td>
          <td className='flex--one'>
            <Button classColor="primary" label="Remove" onClick={() => { removeItem(item.id); }} />
            <Button classColor="secondary" label="Up" onClick={() => { moveItemUp(item.id); }} />
            <Button classColor="secondary" label="Dwn" onClick={() => { moveItemDown(item.id);}} />
          </td>
        </tr>
      ))}
    </>);
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
      <Button data-testid="todo-add-btn" label="Add Item" onClick={addItem} />
      {items.length > ZERO && <Table headers={[{label:'To Do', className:'flex--three'}, {label:'Actions', className:'flex--one'}]} body={renderCells({ items, removeItem, moveItemUp, moveItemDown})} />}
    </Page>
  );
};

export default Home;

import React, { useState } from 'react';
import Page from 'components/layout';
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
      {items.map(({ id, text, note, url }) => (
        <tr className='flex--horizontal' key={id} data-testid={text}>
          <td className='flex--three flex--vertical'>
            {<span className="home__task-text">{text}</span>}
            {note && <span className="home__task-note">{note}</span>}
            {url && <a className="link home__task-link" href={url} target="_blank">{url}</a>}
          </td>
          <td className='flex--one'>
            <Button classColor="primary" label="Remove" onClick={() => { removeItem(id); }} />
            <Button classColor="secondary" label="Up" onClick={() => { moveItemUp(id); }} />
            <Button classColor="secondary" label="Down" onClick={() => { moveItemDown(id);}} />
          </td>
        </tr>
      ))}
    </>);
};

const Home = () => {
  const currentTodo = JSON.parse(localStorage.getItem('todo') || '[]');
  const [items, setItems] = useState(currentTodo);
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');

  const handleTextChange = ({selected}) => {
    setText(selected);
  };

  const handleNoteChange = ({selected}) => {
    setNote(selected);
  };

  const handleUrlChange = ({selected}) => {
    setUrl(selected);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!text.length) {
      return;
    }

    const newItem = {
      text,
      note,
      url,
      id: Date.now()
    };

    const updatedItems = items.concat(newItem);
    setItems(updatedItems);
    setText('');
    setNote('');
    setUrl('');
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
    <Page
      sidePanelContent={
        <div className="container--center">
          <Text data-testid="todo-task" placeholder='Task' selected={text} onChange={handleTextChange} />
          <Text data-testid="todo-notes" placeholder='Notes' selected={note} onChange={handleNoteChange} />
          <Text data-testid="todo-url" placeholder='URL' selected={url} onChange={handleUrlChange} />
          <Button data-testid="todo-add-btn" classColor='primary' label="Add Item" onClick={addItem} />
        </div>
      }
    >
      {items.length > ZERO && <Table headers={[{label:'To Do', className:'flex--three'}, {label:'Actions', className:'flex--one'}]} body={renderCells({ items, removeItem, moveItemUp, moveItemDown})} />}
    </Page>
  );
};

export default Home;

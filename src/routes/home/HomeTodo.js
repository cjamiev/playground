import React, { useState } from 'react';
import Button, { IconButton } from 'components/button';
import Table from 'components/table';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';
import { ICON_TYPES } from 'constants/icon';

const ZERO = 0;

const renderCells = ({ tasks, removeItem, moveItemUp, moveItemDown, onEditTask }) => {
  return (
    <>
      {tasks.map(({ id, text, note, url }) => (
        <tr className='flex--horizontal' key={id} data-testid={text}>
          <td className='flex--three flex--vertical'>
            {<span className="home__task-text">{text}</span>}
            {note && <span className="home__task-note">{note}</span>}
            {url && <a className="link home__task-link" href={url} target="_blank"><label className="home__task-link-label">{url}</label></a>}
          </td>
          <td className='flex--one'>
            <IconButton type={ICON_TYPES.TRASH} onClick={() => { removeItem(id); }} />
            <IconButton type={ICON_TYPES.UP_ARROW} onClick={() => { moveItemUp(id); }} />
            <IconButton type={ICON_TYPES.DOWN_ARROW} onClick={() => { moveItemDown(id);}} />
            <Button classColor="primary" label="Edit" onClick={() => { onEditTask({ id, text, note, url});}} />
          </td>
        </tr>
      ))}
    </>);
};

const HomeTodo = ({tasks, onChange, onEditTask}) => {
  const removeItem = id => {
    const updatedItems = tasks.filter(item => item.id !== id);

    onChange(updatedItems);
  };

  const moveItemUp = id => {
    const index = tasks.findIndex(item => item.id === id);
    const updatedItems = decrementElementIndex(tasks, index);

    onChange(updatedItems);
  };

  const moveItemDown = id => {
    const index = tasks.findIndex((item) => item.id === id);
    const updatedItems = incrementElementIndex(tasks, index);

    onChange(updatedItems);
  };

  return (
    <>
      {tasks.length > ZERO
        ? <Table headers={[{label:'To Do', className:'flex--three'}, {label:'Actions', className:'flex--one'}]} body={renderCells({ tasks, removeItem, moveItemUp, moveItemDown, onEditTask})} />
        : <p> No tasks to display </p>
      }
    </>
  );
};

export default HomeTodo;

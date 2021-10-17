import React, { useState } from 'react';
import { IconButton } from 'components/button';
import Card from 'components/card';
import { decrementElementIndex, incrementElementIndex } from 'arrayHelper';
import { ICON_TYPES } from 'constants/icon';
import { getEllipsisForLongText } from 'stringHelper';

const ZERO = 0;
const MAX_LENGTH = 18;

const HomeTodo = ({ tasks, onChange, onEditTask }) => {
  const removeItem = (id) => {
    const updatedItems = tasks.filter((item) => item.id !== id);

    onChange(updatedItems);
  };

  const moveItemUp = (id) => {
    const index = tasks.findIndex((item) => item.id === id);
    const updatedItems = decrementElementIndex(tasks, index);

    onChange(updatedItems);
  };

  const moveItemDown = (id) => {
    const index = tasks.findIndex((item) => item.id === id);
    const updatedItems = incrementElementIndex(tasks, index);

    onChange(updatedItems);
  };

  return (
    <div className="flex--horizontal">
      {tasks.length > ZERO ? (
        tasks.map(({ id, text, notes, urls }) => (
          <Card
            key={id}
            title={text}
            body={
              <div className="flex--vertical">
                {notes.map(note => (<span key={note} className="home__task-note">{note}</span>))}
                {urls.map(url =>
                  <a key={url} className="link home__task-link" href={url} target="_blank">
                    <label className="home__task-link-label">{getEllipsisForLongText(url, MAX_LENGTH)}</label>
                  </a>
                )}
              </div>
            }
            footer={
              <>
                <IconButton
                  type={ICON_TYPES.EDIT}
                  onClick={() => {
                    onEditTask({ id, text, notes, urls });
                  }}
                />
                <IconButton
                  type={ICON_TYPES.UP_ARROW}
                  onClick={() => {
                    moveItemUp(id);
                  }}
                />
                <IconButton
                  type={ICON_TYPES.DOWN_ARROW}
                  onClick={() => {
                    moveItemDown(id);
                  }}
                />
                <IconButton
                  type={ICON_TYPES.TRASH}
                  onClick={() => {
                    removeItem(id);
                  }}
                />
              </>
            }
          />))
      ) : (
        <p> No tasks to display </p>
      )}
    </div>
  );
};

export default HomeTodo;

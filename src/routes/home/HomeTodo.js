import React, { useState } from 'react';
import Card from 'components/card';
import { decrementElementIndex, incrementElementIndex } from 'arrayHelper';
import { getEllipsisForLongText } from 'stringHelper';
import { ArrowSVG } from 'components/icons/ArrowSVG';
import { TrashSVG } from 'components/icons/TrashSVG';
import { PenSVG } from 'components/icons/PenSVG';
import { SCTodoWrapper, SCTodoTitleWrapper, SCTodoList, SCHomeFooter } from './styles';

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
    <div>
      {tasks.length > ZERO ? (
        tasks.map(({ id, text, notes, urls }) => (
          <SCTodoWrapper key={id}>
            <SCTodoTitleWrapper>
              <h2>{text}</h2>
              <svg
                aria-label="Delete"
                width="27"
                height="27"
                viewBox="0 0 53 53"
                onClick={() => {
                  removeItem(id);
                }}
              >
                <TrashSVG />
              </svg>
              <svg
                aria-label="Move Up"
                width="27"
                height="27"
                viewBox="0 0 53 53"
                onClick={() => {
                  moveItemUp(id);
                }}
              >
                <ArrowSVG conditions={{ orientation: 'UP' }} />
              </svg>
              <svg
                aria-label="Move Down"
                width="27"
                height="27"
                viewBox="0 0 53 53"
                onClick={() => {
                  moveItemDown(id);
                }}
              >
                <ArrowSVG conditions={{ orientation: 'DOWN' }} />
              </svg>
              <svg
                aria-label="Edit"
                width="27"
                height="27"
                viewBox="0 0 53 53"
                onClick={() => {
                  onEditTask({ id, text, notes, urls });
                }}
              >
                <PenSVG />
              </svg>
            </SCTodoTitleWrapper>
            <SCTodoList>
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
              {urls.map((url) => (
                <a key={url} href={url} target="_blank">
                  <label>{getEllipsisForLongText(url, MAX_LENGTH)}</label>
                </a>
              ))}
            </SCTodoList>
          </SCTodoWrapper>
        ))
      ) : (
        <p> No tasks to display </p>
      )}
    </div>
  );
};

export default HomeTodo;

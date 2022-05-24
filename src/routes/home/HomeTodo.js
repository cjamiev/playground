import React, { useState } from 'react';
import Card from 'components/card';
import { decrementElementIndex, incrementElementIndex } from 'arrayHelper';
import { getEllipsisForLongText } from 'stringHelper';
import { ArrowSVG } from 'components/icons/ArrowSVG';
import { TrashSVG } from 'components/icons/TrashSVG';
import { PenSVG } from 'components/icons/PenSVG';
import { SCHomeCardWrapper, SCHomeFooter } from './styles';

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
          <SCHomeCardWrapper key={id} isLarge>
            <Card
              title={text}
              body={
                <div className="flex--vertical">
                  {notes.map((note) => (
                    <span key={note} className="home__task-note">
                      {note}
                    </span>
                  ))}
                  {urls.map((url) => (
                    <a key={url} className="link home__task-link" href={url} target="_blank">
                      <label className="home__task-link-label">{getEllipsisForLongText(url, MAX_LENGTH)}</label>
                    </a>
                  ))}
                </div>
              }
              footer={
                <SCHomeFooter>
                  <svg
                    aria-label="Edit"
                    width="45"
                    height="53"
                    viewBox="0 0 53 53"
                    onClick={() => {
                      onEditTask({ id, text, notes, urls });
                    }}
                  >
                    <PenSVG transform={'translate(0,0)'} />
                  </svg>
                  <svg
                    aria-label="Delete"
                    width="45"
                    height="53"
                    viewBox="0 0 53 53"
                    onClick={() => {
                      removeItem(id);
                    }}
                  >
                    <TrashSVG transform={'translate(0,0)'} />
                  </svg>
                  <svg
                    aria-label="Move Up"
                    width="45"
                    height="53"
                    viewBox="0 0 53 53"
                    onClick={() => {
                      moveItemUp(id);
                    }}
                  >
                    <ArrowSVG transform={'translate(0,0)'} conditions={{ orientation: 'UP' }} />
                  </svg>
                  <svg
                    aria-label="Move Down"
                    width="45"
                    height="53"
                    viewBox="0 0 53 53"
                    onClick={() => {
                      moveItemDown(id);
                    }}
                  >
                    <ArrowSVG transform={'translate(0,0)'} conditions={{ orientation: 'DOWN' }} />
                  </svg>
                </SCHomeFooter>
              }
            />
          </SCHomeCardWrapper>
        ))
      ) : (
        <p> No tasks to display </p>
      )}
    </div>
  );
};

export default HomeTodo;

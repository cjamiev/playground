import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import { decrementElementIndex, incrementElementIndex } from 'arrayHelper';
import { getEllipsisForLongText } from 'stringHelper';
import { ArrowSVG } from 'components/icons/ArrowSVG';
import { TrashSVG } from 'components/icons/TrashSVG';
import { PenSVG } from 'components/icons/PenSVG';
import Button from 'components/button';
import Text from 'components/form/Text';
import ItemCreator from 'components/form/ItemCreator';
import { noop } from 'helper/noop';
import {
  SCFlexWrapper,
  SCCreateFormFieldSet,
  SCTodoWrapper,
  SCTodoTitleWrapper,
  SCTodoList,
  SCHomeFooter
} from './styles';

const ZERO = 0;
const MAX_LENGTH = 18;

const HomeTodo = ({ tasks, selectedTask, onChangeItem, onChange, onEditTask }) => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  const [taskNotes, setTaskNotes] = useState([]);
  const [taskUrls, setTaskUrls] = useState([]);

  useEffect(() => {
    if (selectedTask.text) {
      setTaskText(selectedTask.text);
      setTaskNotes(selectedTask.notes);
      setTaskUrls(selectedTask.urls);
    }
  }, [selectedTask]);

  const handleTextChange = ({ selected }) => {
    setTaskText(selected);
  };

  const handleNotesChange = (updatedNotes) => {
    setTaskNotes(updatedNotes);
  };

  const handleUrlsChange = (updatedUrls) => {
    setTaskUrls(updatedUrls);
  };

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

  const confirmDeleteTask = (taskName, taskId) => {
    dispatch(
      openGlobalModal({
        title: 'Confirmation Modal',
        message: `Are you sure you want to delete '${taskName}'`,
        buttonList: [
          {
            label: 'Confirm',
            classProps: { classColor: 'primary' },
            action: () => {
              removeItem(taskId);
            }
          },
          {
            label: 'Cancel',
            classProps: { classColor: 'secondary' },
            action: noop
          }
        ]
      })
    );
  };

  return (
    <SCFlexWrapper>
      <form>
        <SCCreateFormFieldSet>
          <legend> Add Tasks </legend>
          <Text data-testid="todo-task" placeholder="Task" selected={taskText} onChange={handleTextChange} />
          <ItemCreator placeholder="Note" data={taskNotes} onChange={handleNotesChange} />
          <ItemCreator placeholder="Url" data={taskUrls} onChange={handleUrlsChange} />
          <Button
            data-testid="todo-add-btn"
            classColor="primary"
            label="Submit"
            onClick={() => {
              if (!taskText.length) {
                return;
              }

              const newItem = {
                text: taskText,
                notes: taskNotes,
                urls: taskUrls,
                id: Date.now()
              };
              setTaskText('');
              setTaskNotes([]);
              setTaskUrls([]);

              onChangeItem(newItem);
            }}
          />
        </SCCreateFormFieldSet>
      </form>
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
                  confirmDeleteTask(text, id);
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
    </SCFlexWrapper>
  );
};

export default HomeTodo;

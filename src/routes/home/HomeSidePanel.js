import React, { useEffect, useState } from 'react';
import Button from 'components/button';
import Text from 'components/form/Text';
import TimerForm from 'components/form/TimerForm';

const ZERO = 0;
const ONE = 1;

const HomeSidePanel = ({ selectedTask, onChangeItem, onChangeTimer, selectedTimer }) => {
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (selectedTask.text) {
      setText(selectedTask.text);
      setNote(selectedTask.note);
      setUrl(selectedTask.url);
    }
  }, [selectedTask]);

  const handleTextChange = ({ selected }) => {
    setText(selected);
  };

  const handleNoteChange = ({ selected }) => {
    setNote(selected);
  };

  const handleUrlChange = ({ selected }) => {
    setUrl(selected);
  };

  return (
    <div className="container--center">
      <h3> Add Tasks </h3>
      <Text data-testid="todo-task" placeholder="Task" selected={text} onChange={handleTextChange} />
      <Text data-testid="todo-notes" placeholder="Notes" selected={note} onChange={handleNoteChange} />
      <Text data-testid="todo-url" placeholder="URL" selected={url} onChange={handleUrlChange} />
      <Button
        data-testid="todo-add-btn"
        classColor="primary"
        label="Add Item"
        onClick={() => {
          if (!text.length) {
            return;
          }

          const newItem = {
            text,
            note,
            url,
            id: Date.now()
          };
          setText('');
          setNote('');
          setUrl('');

          onChangeItem(newItem);
        }}
      />
      <h3> Add Timer </h3>
      <TimerForm
        onChange={({ name, content }) => {
          const newTimer = { name, value: content, type: 'timer' };

          onChangeTimer(newTimer);
        }}
        value={selectedTimer}
      />
    </div>
  );
};

export default HomeSidePanel;

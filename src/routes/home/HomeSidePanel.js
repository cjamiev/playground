import React, { useEffect, useState } from 'react';
import Button from 'components/button';
import Text from 'components/form/Text';
import TimerForm from 'components/form/TimerForm';
import ItemCreator from 'components/form/ItemCreator';

const ZERO = 0;
const ONE = 1;

const HomeSidePanel = ({ selectedTask, onChangeItem, onChangeTimer, selectedTimer }) => {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (selectedTask.text) {
      setText(selectedTask.text);
      setNotes(selectedTask.notes);
      setUrls(selectedTask.urls);
    }
  }, [selectedTask]);

  const handleTextChange = ({ selected }) => {
    setText(selected);
  };

  const handleNotesChange = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  const handleUrlsChange = (updatedUrls) => {
    setUrls(updatedUrls);
  };

  return (
    <div className="container--center">
      <h3> Add Tasks </h3>
      <Text data-testid="todo-task" placeholder="Task" selected={text} onChange={handleTextChange} />
      <ItemCreator placeholder="Note" data={notes} onChange={handleNotesChange} />
      <ItemCreator placeholder="Url" data={urls} onChange={handleUrlsChange} />
      <Button
        data-testid="todo-add-btn"
        classColor="primary"
        label="Save Task"
        onClick={() => {
          if (!text.length) {
            return;
          }

          const newItem = {
            text,
            notes,
            urls,
            id: Date.now()
          };
          setText('');
          setNotes([]);
          setUrls([]);

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

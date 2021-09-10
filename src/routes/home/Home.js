import React, { useState } from 'react';
import Page from 'components/layout';
import Button from 'components/button';
import Text from 'components/form/Text';
import Tabs from 'components/tabs';
import TimerForm from 'components/form/TimerForm';
import ComponentWrapper from 'components/ComponentWrapper';
import HomeTodo from './HomeTodo';
import HomeTimer from './HomeTimer';
import './home.css';

const Home = () => {
  const currentTodo = JSON.parse(localStorage.getItem('todo') || '[]');
  const currentTimers = JSON.parse(localStorage.getItem('globaltimers') || '[]');
  const [tasks, setTasks] = useState(currentTodo);
  const [timers, setTimers] = useState(currentTimers);
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

  const handleTasksChange = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleTimersChange = (updatedTimers) => {
    setTimers(updatedTimers);
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

    const updatedTasks = tasks.concat(newItem);
    setTasks(updatedTasks);
    setText('');
    setNote('');
    setUrl('');
    localStorage.setItem('todo', JSON.stringify(updatedTasks));
  };

  const TABS = [
    { title: 'To do', component: ComponentWrapper(HomeTodo, { tasks, onChange: handleTasksChange })},
    { title: 'Timers', component: ComponentWrapper(HomeTimer, { timers, onChange: handleTimersChange })}
  ];

  return (
    <Page
      sidePanelContent={
        <div className="container--center">
          <div>
            <h3> Add Tasks </h3>
            <Text data-testid="todo-task" placeholder='Task' selected={text} onChange={handleTextChange} />
            <Text data-testid="todo-notes" placeholder='Notes' selected={note} onChange={handleNoteChange} />
            <Text data-testid="todo-url" placeholder='URL' selected={url} onChange={handleUrlChange} />
            <Button data-testid="todo-add-btn" classColor='primary' label="Add Item" onClick={addItem} />
          </div>
          <div>
            <h3> Add Global Timer </h3>
            <TimerForm onChange={({ name, content}) => {
              const globalTimer = JSON.parse(localStorage.getItem('globaltimers') || '[]');
              const updatedTimers = timers.concat({ name, value: content, type: 'timer' });
              setTimers(updatedTimers);
              localStorage.setItem('globaltimers', JSON.stringify(updatedTimers));
            }} />
          </div>
        </div>
      }
    >
      <Tabs data={TABS} />
    </Page>
  );
};

export default Home;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { openSidePanel, updateGlobal } from 'components/global/globalActions';
import Page from 'components/layout';
import Button from 'components/button';
import Text from 'components/form/Text';
import Tabs from 'components/tabs';
import TimerForm from 'components/form/TimerForm';
import ComponentWrapper from 'components/ComponentWrapper';
import HomeTodo from './HomeTodo';
import HomeTimer from './HomeTimer';
import './home.css';

const SidePanel = ({onChangeItem, onChangeTimer, selectedTimer}) => {
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

  return (
    <div className="container--center">
      <div>
        <h3> Add Tasks </h3>
        <Text data-testid="todo-task" placeholder='Task' selected={text} onChange={handleTextChange} />
        <Text data-testid="todo-notes" placeholder='Notes' selected={note} onChange={handleNoteChange} />
        <Text data-testid="todo-url" placeholder='URL' selected={url} onChange={handleUrlChange} />
        <Button data-testid="todo-add-btn" classColor='primary' label="Add Item" onClick={() => {
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
      </div>
      <div>
        <h3> Add Global Timer </h3>
        <TimerForm
          onChange={({ name, content}) => {
            const newTimer = { name, value: content, type: 'timer' };

            onChangeTimer(newTimer);
          }}
          value={selectedTimer}
        />
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useLocalStorage('todo', []);
  const [timers, setTimers] = useLocalStorage('globaltimers', []);
  const [selectedTimer, setSelectedTimer] = useState({ name: '', time: new Date()});

  const handleTaskItemChange = (newItem) => {
    const updatedTasks = tasks.concat(newItem);
    setTasks(updatedTasks);
  };

  const handleTasksChange = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleTimeItemChange = (newTimer) => {
    const matched = timers.find(item => item.name === newTimer.name);
    const updatedTimers = matched
      ? timers.map(item => {
        return item.name === newTimer.name ? newTimer: item;
      })
      : timers.concat(newTimer);
    setTimers(updatedTimers);
    setSelectedTimer({ name: '', time: new Date()});
    dispatch(updateGlobal(updatedTimers));
  };

  const handleTimersChange = (updatedTimers) => {
    setTimers(updatedTimers);
    dispatch(updateGlobal(updatedTimers));
  };

  const editTimer = (name, time) => {
    setSelectedTimer({ name, time });
    dispatch(openSidePanel());
  };

  const TABS = [
    { title: 'To do', component: ComponentWrapper(HomeTodo, { tasks, onChange: handleTasksChange })},
    { title: 'Timers', component: ComponentWrapper(HomeTimer, { timers, onChange: handleTimersChange, editTimer })}
  ];

  return (
    <Page
      sidePanelContent={
        <SidePanel
          onChangeItem={handleTaskItemChange}
          onChangeTimer={handleTimeItemChange}
          selectedTimer={selectedTimer}
        />
      }
    >
      <Tabs data={TABS} />
    </Page>
  );
};

export default Home;

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
import HomeSidePanel from './HomeSidePanel';
import './home.css';

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
        <HomeSidePanel
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

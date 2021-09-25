import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { openSidePanel, updateGlobal } from 'components/global/globalActions';
import { loadHome, updateHome } from './homeActions';
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
  const [tasks, setTasks] = useState([]);
  const [timers, setTimers] = useState([]);
  const [selectedTask, setSelectedTask] = useState({ text: '', note: '', url: ''});
  const [selectedTimer, setSelectedTimer] = useState({ id: -1, name: '', time: new Date()});
  const [globalTimers, setGlobalTimers] = useLocalStorage('globaltimers', []);
  const [isGlobalTimer, setIsGlobalTimer] = useState(true);
  const records = useSelector(state => state.home);

  useEffect(() => {
    dispatch(loadHome());
  }, [dispatch]);

  useEffect(() => {
    setTimers(records.timers);
    setTasks(records.todos);
  }, [records]);

  const handleTaskItemChange = (newItem) => {
    const matched = tasks.find(item => item.text === newItem.text);
    const updatedTasks = matched
      ? tasks.map(item => {
        return item.text === newItem.text ? newItem: item;
      })
      : tasks.concat(newItem);

    setTasks(updatedTasks);
    dispatch(updateHome({ todos: updatedTasks, timers }));
  };

  const handleTasksChange = (updatedTasks) => {
    setTasks(updatedTasks);
    dispatch(updateHome({ todos: updatedTasks, timers }));
  };

  const handleGlobalChange = (index) => {
    setIsGlobalTimer(!index);
  };

  const handleTimeItemChange = (newTimer) => {
    const timersToUpdate = newTimer.isGlobalTimer ? globalTimers : timers;
    const matched = timersToUpdate.find(item => item.name === newTimer.name);
    const updatedTimers = matched
      ? timersToUpdate.map(item => {
        return item.name === newTimer.name ? newTimer: item;
      })
      : timersToUpdate.concat(newTimer);
    if(newTimer.isGlobalTimer) {
      setGlobalTimers(updatedTimers);
      dispatch(updateGlobal(updatedTimers));
    } else {
      setTimers(updatedTimers);
      dispatch(updateHome({ todos: tasks, timers: updatedTimers }));
    }
    setSelectedTimer({ name: '', time: new Date()});
  };

  const handleRemoveTimer = (timerToRemove) => {
    const timersToUpdate = timerToRemove.isGlobalTimer ? globalTimers : timers;
    const updatedTimers = timersToUpdate.filter(item => item.name !== timerToRemove.name);
    if(timerToRemove.isGlobalTimer) {
      setGlobalTimers(updatedTimers);
      dispatch(updateGlobal(updatedTimers));
    } else {
      setTimers(updatedTimers);
      dispatch(updateHome({ todos: tasks, timers: updatedTimers }));
    }
  };

  const handleEditTask = (item) => {
    setSelectedTask(item);
  };

  const handleEditTimer = (name, time, isGlobal) => {
    setSelectedTimer({ name, time });
    setIsGlobalTimer(isGlobal);
    dispatch(openSidePanel());
  };

  const TABS = [
    { title: 'To do', component: ComponentWrapper(HomeTodo, { tasks, onChange: handleTasksChange, onEditTask: handleEditTask })},
    { title: 'Timers', component: ComponentWrapper(HomeTimer, { globalTimers, timers, onRemoveTimer: handleRemoveTimer, onEditTimer: handleEditTimer })}
  ];

  return (
    <Page
      sidePanelContent={
        <HomeSidePanel
          selectedTask={selectedTask}
          onChangeItem={handleTaskItemChange}
          onChangeTimer={handleTimeItemChange}
          selectedTimer={selectedTimer}
          isGlobalTimer={isGlobalTimer}
          onChangeGlobal={handleGlobalChange}
        />
      }
    >
      <Tabs data={TABS} />
    </Page>
  );
};

export default Home;

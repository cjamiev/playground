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
  const [globalTimers, setGlobalTimers] = useLocalStorage('globaltimers', []);
  const [selectedTimer, setSelectedTimer] = useState({ name: '', time: new Date()});
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
    const updatedTasks = tasks.concat(newItem);
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

  const handleEditTimer = (name, time, isGlobal) => {
    setSelectedTimer({ name, time });
    setIsGlobalTimer(isGlobal);
    dispatch(openSidePanel());
  };

  const TABS = [
    { title: 'To do', component: ComponentWrapper(HomeTodo, { tasks, onChange: handleTasksChange })},
    { title: 'Timers', component: ComponentWrapper(HomeTimer, { globalTimers, timers, onRemoveTimer: handleRemoveTimer, onEditTimer: handleEditTimer })}
  ];

  return (
    <Page
      sidePanelContent={
        <HomeSidePanel
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

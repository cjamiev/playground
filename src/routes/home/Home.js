import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const Home = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [timers, setTimers] = useState([]);
  const [selectedTask, setSelectedTask] = useState({ text: '', notes: [], urls: [] });
  const [selectedTimer, setSelectedTimer] = useState({ id: -1, name: '', time: new Date() });
  const records = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(loadHome());
  }, [dispatch]);

  useEffect(() => {
    setTimers(records.timers);
    setTasks(records.todos);
  }, [records]);

  const handleTaskItemChange = (newItem) => {
    const matched = tasks.find((item) => item.text === newItem.text);
    const updatedTasks = matched
      ? tasks.map((item) => {
        return item.text === newItem.text ? newItem : item;
      })
      : tasks.concat(newItem);

    setTasks(updatedTasks);
    dispatch(updateHome({ todos: updatedTasks, timers }));
  };

  const handleTasksChange = (updatedTasks) => {
    setTasks(updatedTasks);
    dispatch(updateHome({ todos: updatedTasks, timers }));
  };

  const handleTimeItemChange = (newTimer) => {
    const matched = timers.find((item) => item.name === newTimer.name);
    const updatedTimers = matched
      ? timers.map((item) => {
        return item.name === newTimer.name ? newTimer : item;
      })
      : timers.concat(newTimer);
    setTimers(updatedTimers);
    dispatch(updateGlobal(updatedTimers));
    dispatch(updateHome({ todos: tasks, timers: updatedTimers }));
    setSelectedTimer({ name: '', time: new Date() });
  };

  const handleRemoveTimer = (timerToRemove) => {
    const updatedTimers = timers.filter((item) => item.name !== timerToRemove.name);
    setTimers(updatedTimers);
    dispatch(updateGlobal(updatedTimers));
    dispatch(updateHome({ todos: tasks, timers: updatedTimers }));
  };

  const handleEditTask = (item) => {
    setSelectedTask(item);
    dispatch(openSidePanel());
  };

  const handleEditTimer = (name, time) => {
    setSelectedTimer({ name, time });
    dispatch(openSidePanel());
  };

  const TABS = [
    {
      title: 'To do',
      component: ComponentWrapper(HomeTodo, { tasks, onChange: handleTasksChange, onEditTask: handleEditTask })
    },
    {
      title: 'Timers',
      component: ComponentWrapper(HomeTimer, { timers, onRemoveTimer: handleRemoveTimer, onEditTimer: handleEditTimer })
    }
  ];

  return (
    <Page
      sidePanelContent={
        <HomeSidePanel
          selectedTask={selectedTask}
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

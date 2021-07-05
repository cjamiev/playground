import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPassword, loadFood, loadMain } from './clipboardActions';
import { openGlobalModal } from 'components/modal/globalModalActions';
import Page from 'components/layout';
import List from 'components/list';
import Tabs from 'components/tabs';
import './clipboard.css';

const ComponentWrapper = (props) => {
  return () => {
    return (<div className="clipboard__container">
      {props.clip.map(entry => {
        return <List key={entry.listTitle} header={entry.listTitle} data={entry.listData} />;
      })}
    </div>);
  };
};

const Clipboard = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.clipboard.error.message);
  const passwords = useSelector(state => state.clipboard.passwords);
  const food = useSelector(state => state.clipboard.food);
  const main = useSelector(state => state.clipboard.main);
  const result = useSelector(state => state.list.commandResponse);
  const TABS = [
    { title: 'Passwords', component: ComponentWrapper({ clip:passwords })},
    { title: 'Food', component: ComponentWrapper({ clip:food })},
    { title: 'Main', component: ComponentWrapper({ clip:main })}
  ];

  useEffect(() => {
    dispatch(loadPassword());
    dispatch(loadFood());
    dispatch(loadMain());
  }, [dispatch]);

  useEffect(() => {
    if(result) {
      dispatch(openGlobalModal({ title: 'Command Results', message: result }));
    }
  });

  return (
    <Page title={'Clipboard'} error={error}>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Clipboard;

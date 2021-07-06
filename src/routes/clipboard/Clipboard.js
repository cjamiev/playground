import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPassword, loadFood, loadMain } from './clipboardActions';
import { createAlert } from 'components/alert/alertActions';
import { openGlobalModal } from 'components/modal/globalModalActions';
import Page from 'components/layout';
import List from 'components/list';
import Tabs from 'components/tabs';
import ComponentWrapper from 'components/ComponentWrapper';
import './clipboard.css';

const ClipboardTab = (props) => {
  return (
    <div className="clipboard__container">
      {props.clip.map(entry => {
        return <List key={entry.listTitle} header={entry.listTitle} data={entry.listData} />;
      })}
    </div>
  );
};

const Clipboard = () => {
  const dispatch = useDispatch();
  const { passwords, food, main, error } = useSelector(state => state.clipboard);
  const result = useSelector(state => state.list.commandResponse);
  const TABS = [
    { title: 'Passwords', component: ComponentWrapper(ClipboardTab,{ clip:passwords })},
    { title: 'Food', component: ComponentWrapper(ClipboardTab,{ clip:food })},
    { title: 'Main', component: ComponentWrapper(ClipboardTab,{ clip:main })}
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

  useEffect(() => {
    if(error.message) {
      dispatch(createAlert({ content: error.message, status: 'error' }));
    }
  });

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Clipboard;

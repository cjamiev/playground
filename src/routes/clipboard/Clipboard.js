import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadClipboard } from './clipboardActions';
import { createAlert } from 'components/alert/alertActions';
import { openGlobalModal } from 'components/modal/globalModalActions';
import Page from 'components/layout';
import List from 'components/list';
import Tabs from 'components/tabs';
import ComponentWrapper from 'components/ComponentWrapper';
import './clipboard.css';

const ZERO = 0;

const ClipboardTab = (props) => {
  return (
    <div className="clipboard__container">
      {props.clip.map(entry => {
        return <List key={entry.title} header={entry.title} data={entry.data} />;
      })}
    </div>
  );
};

const Clipboard = () => {
  const dispatch = useDispatch();
  const { clipboard, error } = useSelector(state => state.clipboard);
  const result = useSelector(state => state.list.commandResponse);
  const TABS = Object.keys(clipboard).map(filename => {
    const name = filename.split('.')[ZERO];

    return { title: name, component: ComponentWrapper(ClipboardTab,{ clip:clipboard[name] })};
  });

  useEffect(() => {
    dispatch(loadClipboard());
  }, [dispatch]);

  useEffect(() => {
    if(result) {
      dispatch(openGlobalModal({ title: 'Command Results', message: result }));
    }
  }, [dispatch, result]);

  useEffect(() => {
    if(error.message) {
      dispatch(createAlert({ content: error.message, status: 'error' }));
    }
  }, [dispatch, error.message]);

  return (
    <Page>
      {TABS.length > ZERO && <Tabs data={TABS} />}
    </Page>
  );
};

export default Clipboard;

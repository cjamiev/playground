import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from 'components/alert/alertActions';
import DynamicForm from 'components/form/DynamicForm';
import { loadMockRequests } from './mockserverActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import MockConfig from './MockConfig';
import MockLog from './MockLog';

const TABS = [
  { title: 'Configuration', component: MockConfig},
  { title: 'Log', component: MockLog}
];

const MockServer = () => {
  const dispatch = useDispatch();

  return (
    <Page>
      <Tabs data={TABS} onTabSwitch={() => { dispatch(dismissAlert());} }/>
    </Page>
  );
};

export default MockServer;

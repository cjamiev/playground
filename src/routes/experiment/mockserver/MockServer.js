import React from 'react';
import { useDispatch } from 'react-redux';
import { dismissAlert } from 'components/atoms/Alert/alertActions';
import Tabs from 'components/atoms/Tabs';
import MockConfig from './MockConfig';
import MockLog from './MockLog';
import MockViewEndpoint from './MockViewEndpoint';
import MockCreateEndpoint from './MockCreateEndpoint';

const TABS = [
  { title: 'Config', component: MockConfig },
  { title: 'View', component: MockViewEndpoint },
  { title: 'Create', component: MockCreateEndpoint },
  { title: 'Log', component: MockLog }
];

const MockServer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Tabs
        data={TABS}
        onTabSwitch={() => {
          dispatch(dismissAlert());
        }}
      />
    </>
  );
};

export default MockServer;

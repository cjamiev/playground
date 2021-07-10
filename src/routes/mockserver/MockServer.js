import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicForm from 'components/form/DynamicForm';
import { loadMockRequests } from './mockserverActions';
import Page from 'components/layout';
import MockConfig from './MockConfig';

const MockServer = () => {
  const dispatch = useDispatch();
  const { mocks } = useSelector(state => state.mockserver);

  useEffect(() => {
    dispatch(loadMockRequests());
  }, [dispatch]);


  return (
    <Page>
      <MockConfig />
    </Page>
  );
};

export default MockServer;

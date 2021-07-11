import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicForm from 'components/form/DynamicForm';
import { createAlert } from 'components/alert/alertActions';
import { createMockEndpoint } from './mockserverActions';
import Page from 'components/layout';
import { isEmpty } from 'booleanHelper';
import { mapFieldsToNewMockPayload, getNewMockFields } from './helper';

const MockCreateEndpoint = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.mockserver);

  useEffect(() => {
    if(message.message) {
      dispatch(createAlert({ content: message.message, status: message.error ? 'error': 'success' }));
    }
  }, [dispatch, message]);

  const onSubmit = (updatedFields) => {
    const payload = mapFieldsToNewMockPayload(updatedFields);
    dispatch(createMockEndpoint(payload));
  };

  return (
    <DynamicForm fieldsList={getNewMockFields()} onSubmit={onSubmit} />
  );
};

export default MockCreateEndpoint;
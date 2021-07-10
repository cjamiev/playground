import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicForm from 'components/form/DynamicForm';
import { loadMockServerConfig, updateMockServerConfig, loadMockRequests } from './mockserverActions';
import Page from 'components/layout';
import { isEmpty } from 'booleanHelper';
import { mapConfigPayloadToFields, mapFieldsToConfigPayload } from './helper';

const MockConfig = () => {
  const dispatch = useDispatch();
  const { config } = useSelector(state => state.mockserver);

  useEffect(() => {
    dispatch(loadMockServerConfig());
  }, [dispatch]);

  const onSubmit = (updatedFields) => {
    const payload = mapFieldsToConfigPayload(updatedFields);
    dispatch(updateMockServerConfig(payload));
  };

  const fields = !isEmpty(config) ? mapConfigPayloadToFields(config) : [];

  return (
    <DynamicForm fieldsList={fields} onSubmit={onSubmit} />
  );
};

export default MockConfig;
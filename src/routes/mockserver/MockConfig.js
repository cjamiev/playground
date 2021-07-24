import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicForm, { hasError, updateData } from 'components/form/DynamicForm';
import { createAlert } from 'components/alert/alertActions';
import { loadMockServerConfig, updateMockServerConfig, loadMockRequests } from './mockserverActions';
import Page from 'components/layout';
import Button from 'components/button';
import { isEmpty } from 'booleanHelper';
import { mapConfigPayloadToFields, mapFieldsToConfigPayload } from './helper';

const MockConfig = () => {
  const [fields, setFields] = useState([]);
  const dispatch = useDispatch();
  const { config, message } = useSelector(state => state.mockserver);

  useEffect(() => {
    dispatch(loadMockServerConfig());
  }, [dispatch]);

  useEffect(() => {
    if(message.message) {
      dispatch(createAlert({ content: message.message, status: message.error ? 'error': 'success' }));
    }
  }, [dispatch, message]);

  useEffect(() => {
    if(!isEmpty(config)) {
      const mappedData = mapConfigPayloadToFields(config);

      setFields(mappedData);
    }
  }, [config]);

  const handleChange = (changedData) => {
    const updatedFields = updateData(fields, changedData);

    setFields(updatedFields);
  };

  const onSubmit = () => {
    const payload = mapFieldsToConfigPayload(fields);
    dispatch(updateMockServerConfig(payload));
  };

  return (
    <>
      <DynamicForm data={fields} onChange={handleChange} />
      <Button label="Submit" disabled={hasError(fields)} onClick={onSubmit} />
    </>
  );
};

export default MockConfig;
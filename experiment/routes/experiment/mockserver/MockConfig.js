import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicForm, { hasError, updateData } from 'components/atoms/Form/DynamicForm';
import { createAlert } from 'components/atoms/Alert/alertActions';
import { loadMockServerConfig, updateMockServerConfig, loadMockRequests } from './mockserverActions';
import Page from 'components/layout';
import Button from 'components/atoms/Button';
import { isEmpty } from 'utils/booleanHelper';
import { mapConfigPayloadToFields, mapFieldsToConfigPayload } from './helper';

const MockConfig = () => {
  const [fields, setFields] = useState([]);
  const dispatch = useDispatch();
  const { config } = useSelector((state) => state.mockserver);

  useEffect(() => {
    dispatch(loadMockServerConfig());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(config)) {
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
      <div className="container--center">
        <Button isPrimary label="Submit" disabled={hasError(fields)} onClick={onSubmit} />
      </div>
    </>
  );
};

export default MockConfig;

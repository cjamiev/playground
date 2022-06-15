import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicForm, { hasError, updateData } from 'components/atoms/Form/DynamicForm';
import { createMockEndpoint } from './mockserverActions';
import Page from 'components/layout';
import Button from 'components/atoms/Button';
import { isEmpty } from 'utils/booleanHelper';
import { mapFieldsToNewMockPayload, getNewMockFields } from './helper';

const MockCreateEndpoint = () => {
  const [fields, setFields] = useState(getNewMockFields());
  const dispatch = useDispatch();

  const handleChange = (changedData) => {
    const updatedFields = updateData(fields, changedData);

    setFields(updatedFields);
  };

  const onSubmit = () => {
    const payload = mapFieldsToNewMockPayload(fields);
    dispatch(createMockEndpoint(payload));
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

export default MockCreateEndpoint;

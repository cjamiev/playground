import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTest, removeTest } from './actions';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Button from 'components/button';

const ZERO = 0;
const parseInput = (data) => {
  if (!isNaN(data)) {
    return {
      isValid: true,
      data: parseInt(data)
    };
  } else {
    return {
      isValid: false,
      data: 'Not a valid number'
    };
  }
};

const TestRedux = (props) => {
  const [input, setInput] = useState(ZERO);
  const dispatch = useDispatch();
  const experimentData = useSelector(state => state.experiment.testRedux);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddTest = (event) => {
    const result = parseInput(input);

    if (result.isValid) {
      dispatch(addTest(result.data));
      dispatch(dismissAlert());
    } else {
      dispatch(createAlert({ content: result.data, status: 'error' }));
    }
  };

  const handleRemoveTest = (event) => {
    dispatch(removeTest(input));
  };

  if(props.hide) {
    return null;
  }

  return (
    <div className="container--center">
      <p>State: {experimentData.join(',')}</p>
      <label>Input value</label>
      <input type="text" onChange={handleInputChange} value={input} />
      <Button label="Add To State" onClick={handleAddTest} />
      <Button label="Remove From State" classSize='wide' onClick={handleRemoveTest} />
    </div>
  );
};

export default TestRedux;

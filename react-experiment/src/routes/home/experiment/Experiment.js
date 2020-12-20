import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTest, removeTest } from './experimentActions';
import { openGlobalModal } from 'components/modal/globalModalActions';

const divStyle = {
  margin: 'auto',
  width: '75%',
  border: '1px solid black',
  padding: '10px'
};

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

const Experiment = (props) => {
  const [input, setInput] = useState(ZERO);
  const dispatch = useDispatch();
  const experimentData = useSelector(state => state.experiment);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddTest = (event) => {
    const result = parseInput(input);

    if (result.isValid) {
      dispatch(addTest(result.data));
    } else {
      dispatch(openGlobalModal({ title: 'Error Message', message: result.data }));
    }
  };

  const handleRemoveTest = (event) => {
    dispatch(removeTest(input));
  };

  return (
    <div style={divStyle}>
      <p>State:{experimentData}</p>
      <label>Input value</label>
      <input type="text" onChange={handleInputChange} value={input} />
      <button type="button" onClick={handleAddTest}>
        Add To State
      </button>
      <button type="button" onClick={handleRemoveTest}>
        Remove From State
      </button>
    </div>
  );
};

export default Experiment;

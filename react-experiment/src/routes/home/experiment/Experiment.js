import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addTest, removeTest } from './experimentActions';
import { openGlobalModal } from 'components/modal/globalModalActions';

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

const TestContainer = (props) => {
  const [input, setInput] = useState(ZERO);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddTest = (event) => {
    const result = parseInput(input);

    if (result.isValid) {
      props.addTest(result.data);
    } else {
      dispatch(openGlobalModal({ title: 'Error Message', message: result.data }));
    }
  };

  const handleRemoveTest = (event) => {
    props.removeTest(input);
  };

  return (
    <div style={divStyle}>
      <p>State:{props.test}</p>
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

const divStyle = {
  margin: 'auto',
  width: '75%',
  border: '1px solid black',
  padding: '10px'
};

const mapStateToProps = (state) => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = {
  addTest,
  removeTest
};

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer);

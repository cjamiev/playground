import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTest, removeTest } from './experimentActions';
import { openGlobalModal } from 'components/modal/globalModalActions';
import './experiment.css';

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

const TestRedux = (props) => {
  const [input, setInput] = useState(ZERO);
  const dispatch = useDispatch();
  const experimentData = useSelector(state => state.experiment);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddTest = (event) => {
    const result = parseInput(input);

    if (result.isValid) {
      props.handleError('');
      dispatch(addTest(result.data));
    } else {
      props.handleError(result.data);
      dispatch(openGlobalModal({ title: 'Error Message', message: result.data }));
    }
  };

  const handleRemoveTest = (event) => {
    dispatch(removeTest(input));
  };

  if(props.hide) {
    return null;
  }

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

const Experiment = (props) => {
  return (
    <div>
      <button className="btn btn--primary">Test Button</button>
      <button className="btn btn--secondary">Test2 Button</button>
      <div class="input-field-group input-field-group--vertical">
        <div class="input-field">
          <input class="input-field__item" type="checkbox" value=""/>
          <label class="input-field__label"> Default checkbox </label>
        </div>
        <div class="input-field">
          <input class="input-field__item" type="checkbox" value=""/>
          <label class="input-field__label"> Default checkbox </label>
        </div>
      </div>
      <div class="input-field-group input-field-group--vertical">
        <div class="input-field">
          <input class="input-field__item" name="radiogroup" type="radio" value=""/>
          <label class="input-field__label"> Default radio1 </label>
        </div>
        <div class="input-field">
          <input class="input-field__item" name="radiogroup" type="radio" value=""/>
          <label class="input-field__label"> Default radio2 </label>
        </div>
      </div>

      <TestRedux hide={true} handleError={props.handleError}/>
    </div>
  );
};

export default Experiment;

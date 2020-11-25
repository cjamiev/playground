import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../components/modalActions';

const TestComponent = () => {
  const [testData, setTestData] = useState('');
  const dispatch = useDispatch();

  const open = () => dispatch(openModal({ title: 'test-title', message: 'test-message', action: () => { console.log('test'); } }));

  const onChange = ({ target }) => {
    setTestData(target.value);
  };

  return (
    <Fragment>
      <br />
      <input onBlur={onChange} />
      <br />
      <label>{testData}</label>
      <button onClick={open}>Open Modal</button>
    </Fragment>
  );
};

export default TestComponent;
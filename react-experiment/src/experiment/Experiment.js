import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../components/modalActions';
import { testGet, testPost } from './experimentActions';

const TestComponent = () => {
  const [testData, setTestData] = useState('');
  const dispatch = useDispatch();
  const experimentData = useSelector((state) => state.experiment);

  useEffect(() => {
    setTestData((experimentData && experimentData?.value?.test) || '');
  }, [experimentData]);

  const open = () =>
    dispatch(
      openModal({
        title: 'test-title',
        message: 'test-message',
        action: () => {
          alert('test');
        }
      })
    );
  const runGet = () => {
    dispatch(testGet());
  };
  const runPost = () => {
    dispatch(testPost({ key: 'condition' }));
  };

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
      <button onClick={runGet}>test get api</button>
      <button onClick={runPost}>test post api</button>
    </Fragment>
  );
};

export default TestComponent;

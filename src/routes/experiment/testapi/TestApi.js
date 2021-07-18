import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { testGet, testPost } from './testApiActions';
import Button from 'components/button';

const TestApi = () => {
  const [testData, setTestData] = useState('');
  const dispatch = useDispatch();
  const testApiData = useSelector(state => state.experiment.testApi);

  useEffect(() => {
    setTestData(testApiData && JSON.stringify(testApiData));
  }, [testApiData]);

  const runGet = () => {
    dispatch(testGet());
  };
  const runPost = () => {
    dispatch(testPost({ key: 'condition' }));
  };

  return (
    <>
      <div role="group">
        <Button label="Get Api" onClick={runGet} />
        <Button label="Post Api" onClick={runPost} />
      </div>
      <label>{testData}</label>
    </>
  );
};

export default TestApi;

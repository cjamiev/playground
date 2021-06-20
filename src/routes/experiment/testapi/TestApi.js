import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { testGet, testPost } from './testApiActions';

const TestApi = () => {
  const [testData, setTestData] = useState('');
  const dispatch = useDispatch();
  const testApiData = useSelector(state => state.testApi);

  useEffect(() => {
    setTestData((testApiData && testApiData?.value?.test) || '');
  }, [testApiData]);

  const runGet = () => {
    dispatch(testGet());
  };
  const runPost = () => {
    dispatch(testPost({ key: 'condition' }));
  };

  return (
    <Fragment>
      <div role="group">
        <button className="btn" onClick={runGet}>test get api</button>
        <button className="btn" onClick={runPost}>test post api</button>
      </div>
      <label>{testData}</label>
    </Fragment>
  );
};

export default TestApi;

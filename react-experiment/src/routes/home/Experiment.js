import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from 'components/modal/modalActions';
import { testGet, testPost } from './experimentActions';

const Experiment = () => {
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
      <div className="btn-group mr-2" role="group" aria-label="First group">
        <button className="btn btn-primary" onClick={open}>Open Modal</button>
      </div>
      <div className="btn-group mr-2" role="group" aria-label="Second group">
        <button className="btn btn-secondary" onClick={runGet}>test get api</button>
        <button className="btn btn-secondary" onClick={runPost}>test post api</button>
      </div>
    </Fragment>
  );
};

export default Experiment;

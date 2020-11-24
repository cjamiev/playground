import React, { Fragment, useState } from 'react';

const TestComponent = () => {
  const [testData, setTestData] = useState('');

  const onChange = ({ target }) => {
    setTestData(target.value);
  };

  return (
    <Fragment>
      <br/>
      <input onBlur={onChange} />
      <br/>
      <label>{testData}</label>
    </Fragment>
  );
};

export default TestComponent;
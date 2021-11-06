/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';

const TestNew = () => {
  const [item, setItem] = useState('Test New');

  return <div>{item}</div>;
};

export default TestNew;

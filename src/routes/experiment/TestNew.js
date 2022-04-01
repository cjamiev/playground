/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import { SCDiv } from './styles';

const TestNew = () => {
  const [item, setItem] = useState('Test Red');

  return <>
    <SCDiv isRed={true}>{item}</SCDiv>
    <SCDiv isRed={false}>Test Blue</SCDiv>
  </>;
};

export default TestNew;

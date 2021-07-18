import React, { useState } from 'react';
import Page from 'components/layout';
import Text from 'components/form/Text';
import './generator.css';

const getBoxStyle = (radius) => {
  const borderRadius = radius ? `${radius}em`: '0em';
  return {
    borderRadius
  };
};

const Generator = () => {
  const [borderRadius, setBorderRadius] = useState('5');

  const handleBorderRadiusChange = ({ selected }) => {
    setBorderRadius(selected);
  };

  return (
    <Page>
      <Text label='Set Border Radius' selected={borderRadius} onChange={handleBorderRadiusChange} />
      <div style={getBoxStyle(borderRadius)} className='generator__box' />
      <div>{JSON.stringify(getBoxStyle(borderRadius))}</div>
    </Page>
  );
};

export default Generator;

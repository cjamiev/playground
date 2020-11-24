import React, { useState } from 'react';

import SwapSelect from '../components/form/SwapSelect';

const TestSwapSelect = () => {
  const [listOne, setListOne] = useState(['grocery', 'Saab', 'Opel', 'Audi']);
  const [listTwo, setListTwo] = useState([]);

  const onChange = (updatedListOne, updatedListTwo) => {
    setListOne(updatedListOne);
    setListTwo(updatedListTwo);
  };

  return (
    <div style={divStyle}>
      <SwapSelect
        onChange={onChange}
        listOne={listOne}
        listTwo={listTwo}
      />
    </div>
  );
};

const divStyle = {
  margin: 'auto',
  width: '75%',
  padding: '10px'
};

export default TestSwapSelect;
import React, { useState } from 'react';

import SwapSelect from 'components/form/SwapSelect';

const TestSwapSelect = () => {
  const [listOne, setListOne] = useState([{ label: 'grocery', selected: false }, { label: 'shoes', selected: false }, { label: 'cars', selected: false }, { label: 'electronics', selected: false }]);
  const [listTwo, setListTwo] = useState([]);

  const onChange = (updatedListOne, updatedListTwo) => {
    setListOne(updatedListOne);
    setListTwo(updatedListTwo);
  };

  return (
    <div className="container--center">
      <SwapSelect onChange={onChange} listOne={listOne} listTwo={listTwo} />
    </div>
  );
};

export default TestSwapSelect;

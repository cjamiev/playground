import React, { useState } from 'react';

import MultiselectRenderer from './MultiselectRenderer';
import './SwapSelect.css';

const SwapSelect = ({ listOneLabel, listTwoLabel, listOne, listTwo, onChange }) => {
  const [listOneSelected, setListOne] = useState([]);
  const [listTwoSelected, setListTwo] = useState([]);

  const onListOneChange = ({ selected }) => {
    setListOne(selected);
  };
  const onListTwoChange = ({ selected }) => {
    setListTwo(selected);
  };

  const onSwapRight = () => {
    const updatedFilteredList = listOne.filter((item) => !listOneSelected.includes(item));
    const updatedAppendedList = listTwo.concat(listOneSelected);

    setListOne([]);
    setListTwo([]);
    onChange(updatedFilteredList, updatedAppendedList);
  };

  const onSwapLeft = () => {
    const updatedFilteredList = listTwo.filter((item) => !listTwoSelected.includes(item));
    const updatedAppendedList = listOne.concat(listTwoSelected);

    setListOne([]);
    setListTwo([]);
    onChange(updatedAppendedList, updatedFilteredList);
  };

  return (
    <div className="swapselect-grid">
      <div className="swapselect-multiselect">
        <MultiselectRenderer id={1} label={listOneLabel} values={listOne} onChange={onListOneChange} />
      </div>
      <div className="swapselect-btn-grid">
        <div>
          <button className="swapselect-swapright-btn" disabled={!listOneSelected.length} onClick={onSwapRight}>
            {'>>'}
          </button>
          <button className="swapselect-swapleft-btn" disabled={!listTwoSelected.length} onClick={onSwapLeft}>
            {'<<'}
          </button>
        </div>
      </div>
      <div className="swapselect-multiselect">
        <MultiselectRenderer id={2} label={listTwoLabel} values={listTwo} onChange={onListTwoChange} />
      </div>
    </div>
  );
};

SwapSelect.defaultProps = {
  listOneLabel: 'Group 1',
  listTwoLabel: 'Group 2',
  listOne: [],
  listTwo: [],
  onChange: (listOne, listTwo) => ({ listOne, listTwo })
};

export default SwapSelect;

import React, { useState } from 'react';
import Button from 'components/button';
import Table from 'components/table';
import { DisplayTimer } from 'components/list/List';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';

const ZERO = 0;
const ONE = 1;

const renderCells = ({ timers, removeTimer }) => {
  const cells = timers.map(item => {
    const newDate = new Date(item.value.year,item.value.month-ONE,item.value.day,item.value.hour,item.value.minute,item.value.second);

    return (
      <tr className='flex--horizontal' key={item.name} data-testid={item.name}>
        <td className='flex--three flex--vertical'>
          <DisplayTimer label={item.name} value={newDate.toString()} />
        </td>
        <td className='flex--one'>
          <Button classColor="primary" label="Remove" onClick={() => { removeTimer(item.name); }} />
        </td>
      </tr>
    );
  });

  return (<>{cells}</>);
};

const HomeTimer = ({timers, onChange}) => {
  const removeTimer = name => {
    const updatedTimers = timers.filter(item => item.name !== name);

    onChange(updatedTimers);
    localStorage.setItem('globaltimers', JSON.stringify(updatedTimers));
  };

  return (
    <>
      {timers.length > ZERO
        ? <Table headers={[{label:'Timer', className:'flex--three'}, {label:'Actions', className:'flex--one'}]} body={renderCells({ timers, removeTimer })} />
        : <p> No timers to display </p>
      }
    </>
  );
};

export default HomeTimer;

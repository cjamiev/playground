import React, { useState } from 'react';
import Button, { IconButton } from 'components/button';
import Table from 'components/table';
import { DisplayTimer } from 'components/list/List';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';
import { ICON_TYPES } from 'constants/icon';

const ZERO = 0;
const ONE = 1;

const renderCells = ({ timers, onRemoveTimer, onEditTimer }) => {
  const cells = timers.map(item => {
    const newDate = new Date(item.value.year,item.value.month-ONE,item.value.day,item.value.hour,item.value.minute,item.value.second);

    return (
      <tr className='flex--horizontal' key={item.name} data-testid={item.name}>
        <td className='flex--three flex--vertical'>
          <DisplayTimer label={item.name} value={newDate.toString()} />
        </td>
        <td className='flex--one'>
          <IconButton type={ICON_TYPES.TRASH} onClick={() => { onRemoveTimer(item); }} />
          <Button classColor="primary" label="Edit" onClick={() => { onEditTimer(item.name, newDate); }} />
        </td>
      </tr>
    );
  });

  return (<>{cells}</>);
};

const HomeTimer = ({timers, onRemoveTimer, onEditTimer}) => {
  return (
    <>
      {timers.length > ZERO
        ? <Table headers={[{label:'Timer', className:'flex--three'}, {label:'Actions', className:'flex--one'}]} body={renderCells({ timers, onRemoveTimer, onEditTimer })} />
        : <p> No timers to display </p>
      }
    </>
  );
};

export default HomeTimer;

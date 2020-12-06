import React, { Fragment } from 'react';
import CheckboxRenderer from './CheckboxRenderer';

const CheckboxList = ({ values = [], onChangeCheckboxList }) => {
  const handleCheckboxListChange = ({ id, selected }) => {
    const updatedSelection = values.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected
        };
      }

      return item;
    });

    onChangeCheckboxList({ id, selected: updatedSelection });
  };

  const renderCheckboxes = values.map((item) => {
    return (
      <CheckboxRenderer
        key={item.id}
        id={item.id}
        label={item.label}
        selected={item.selected}
        onChangeCheckbox={handleCheckboxListChange}
      />
    );
  });

  return <Fragment>{renderCheckboxes}</Fragment>;
};

export default CheckboxList;

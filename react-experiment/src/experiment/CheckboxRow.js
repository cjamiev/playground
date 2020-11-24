import React, { Fragment } from 'react';
import CheckboxRenderer from './CheckboxRenderer';
import CheckboxList from './CheckboxList';


const SELECT_ALL_COLUMN_ID = 0;

const CheckboxRow = ({ id = '', label = '', values = [], selectAllLabel = '', selectAll = false, onChangeRow }) => {
  const handleSelectAllChange = ({ selected }) => {
    const updatedSelection = values.map(item => {
      return {
        ...item,
        selected
      };
    });

    onChangeRow({ id, selectAll: selected, values: updatedSelection, columnId: SELECT_ALL_COLUMN_ID });
  };

  const handleCheckboxRowChange = (update) => {
    const itemCheckedId = update.id;
    const updatedValues = update.selected;
    const itemCheckedColumnId = updatedValues.find(item => item.id === itemCheckedId).columnId;

    onChangeRow({ id, selectAll: false, values: updatedValues, columnId: itemCheckedColumnId });
  };

  return (
    <Fragment>
      <label>{label}</label>
      <CheckboxRenderer
        id={id}
        label={selectAllLabel}
        selected={selectAll}
        onChangeCheckbox={handleSelectAllChange}
      />
      <CheckboxList
        values={values}
        onChangeCheckboxList={handleCheckboxRowChange}
      />
    </Fragment>
  );
};

export default CheckboxRow;
import React, { Fragment } from 'react';

const CheckboxRenderer = ({ id, label, values, selected, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const shouldRemoveOrAdd = selected.find((item) => item === value);
    const updatedSelection = shouldRemoveOrAdd ? selected.filter((item) => item !== value) : selected.concat([value]);

    onChange({ id, selected: updatedSelection });
  };

  const checkboxes = values.map((value) => {
    return (
      <div key={value}>
        <label>
          <input style={checkboxStyle} type="checkbox" name={label} value={value} onChange={handleSelectedChange} />
          {value}
        </label>
      </div>
    );
  });

  return (
    <Fragment>
      <label>{label}</label>
      {checkboxes}
    </Fragment>
  );
};

CheckboxRenderer.defaultProps = {
  id: '',
  label: '',
  values: [],
  selected: [],
  onChange: (selected) => selected
};

const checkboxStyle = {
  margin: '0px 5px 0px 0px'
};

export default CheckboxRenderer;

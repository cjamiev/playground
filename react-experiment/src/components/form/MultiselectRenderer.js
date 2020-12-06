import React from 'react';

const MultiselectRenderer = ({ id, label, values, onChange }) => {
  const handleSelectedChange = ({ target: { options } }) => {
    const updatedSelection = [...options].filter((entry) => entry.selected).map((entry) => entry.value);

    onChange({ id, selected: updatedSelection });
  };

  const getOptions = values.map((value) => (
    <option key={value} label={value} value={value}>
      {value}
    </option>
  ));

  return (
    <div>
      <label>{label}</label>
      <select
        data-testid={'multiselect-' + label}
        style={multiselectStyle}
        name="MultiselectRenderer"
        multiple
        aria-label="multi-select"
        onChange={handleSelectedChange}
      >
        {getOptions}
      </select>
    </div>
  );
};

MultiselectRenderer.defaultProps = {
  id: '',
  label: '',
  values: [],
  onChange: (selected) => selected
};

const multiselectStyle = {
  margin: '10px 0px 10px 0px',
  overflow: 'auto'
};

export default MultiselectRenderer;

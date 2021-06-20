import React from 'react';

const divStyle = {
  width: '200px'
};

const labelStyle = {
  display: 'block'
};

const multiselectStyle = {
  margin: '10px 0',
  overflow: 'auto',
  width: '200px'
};

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
    <div style={divStyle}>
      <label style={labelStyle}>{label}</label>
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

export default MultiselectRenderer;

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
  const handleChange = (selectedLabel, currentValues) => {
    const updatedValues = currentValues.map(item => {
      if(item.label === selectedLabel) {
        return {
          ...item,
          selected: !item.selected
        };
      }

      return item;
    });

    onChange({ id, values: updatedValues });
  };

  const getOptions = values.map((item) => (
    <option key={item.label} value={item.label} onChange={() => { handleChange(item.label, values);}}>
      {item.label}
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
      >
        {getOptions}
      </select>
    </div>
  );
};

export default MultiselectRenderer;

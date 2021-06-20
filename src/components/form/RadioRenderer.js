import React, { Fragment } from 'react';

const RadioRenderer = ({ id, label, values, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  const radios = values.map((value) => {
    return (
      <div key={value}>
        <label>
          <input style={radioStyle} type="radio" name={label} value={value} onChange={handleSelectedChange} />
          {value}
        </label>
      </div>
    );
  });

  return (
    <Fragment>
      <label>{label}</label>
      {radios}
    </Fragment>
  );
};

RadioRenderer.defaultProps = {
  id: '',
  label: '',
  values: '',
  onChange: (selected) => selected
};

const radioStyle = {
  margin: '0px 5px 0px 0px'
};

export default RadioRenderer;

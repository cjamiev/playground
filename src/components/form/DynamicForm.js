import React from 'react';

import Button from 'components/button';
import Checkbox from './Checkbox';
import Color from './Color';
import Calendar from './Date';
import Dropdown from './Dropdown';
import Multiselect from './Multiselect';
import Radio from './Radio';
import Range from './Range';
import SwapSelect from './SwapSelect';
import Select from './Select';
import Text from './Text';
import TextArea from './TextArea';
import './form.css';

const typeMap = {
  button: Button,
  checkbox: Checkbox,
  color: Color,
  date: Calendar,
  dropdown: Dropdown,
  multiselect: Multiselect,
  radio: Radio,
  range: Range,
  select: Select,
  swapselect: SwapSelect,
  text: Text,
  textarea: TextArea
};

export const hasError = (data) => {
  return data.find(entry => entry.error || (entry.required && !entry.values.find(item => item.selected)));
};

export const updateData = (data, changedItem) => {
  return data.map(item => (item.id === changedItem.id ? { ...item, ...changedItem } : item));
};

const DynamicForm = ({ data, onChange }) => {
  const form = data
    .sort((item1, item2) => item1.orderSeq - item2.orderSeq)
    .map(entry => {
      const Component = typeMap.hasOwnProperty(entry.type) ? typeMap[entry.type] : null;

      return <Component key={entry.label || `${entry.labelOne}  ${entry.labelTwo}`} {...entry} onChange={onChange} />;
    });

  return (
    <div className="container--center">
      {form}
    </div>
  );
};

export default DynamicForm;

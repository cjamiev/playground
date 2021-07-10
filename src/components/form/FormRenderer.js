import React from 'react';

import CheckboxRenderer from './CheckboxRenderer';
import DateRenderer from './DateRenderer';
import MultiselectRenderer from './MultiselectRenderer';
import RadioRenderer from './RadioRenderer';
import SelectRenderer from './SelectRenderer';
import TextRenderer from './TextRenderer';
import TextAreaRenderer from './TextAreaRenderer';
import './form.css';

const handleInputType = {
  checkbox: CheckboxRenderer,
  date: DateRenderer,
  multiselect: MultiselectRenderer,
  radio: RadioRenderer,
  select: SelectRenderer,
  text: TextRenderer,
  textarea: TextAreaRenderer
};

const FormRenderer = (fieldsData, onChange) => {
  return fieldsData
    .sort((item1, item2) => item1.orderSeq - item2.orderSeq)
    .map((entry) => {
      if (handleInputType.hasOwnProperty(entry.type)) {
        const InputComponent = handleInputType[entry.type];

        return <InputComponent key={entry.label} {...entry} onChange={onChange} />;
      }

      return null;
    });
};

export default FormRenderer;

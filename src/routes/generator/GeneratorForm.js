import React, { useState } from 'react';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import {
  BackdropFilterForm,
  BorderForm,
  BorderRadiusForm,
  BoxShadowForm,
  BackgroundColorForm,
  FilterForm,
  MarginForm,
  OutlineForm,
  PaddingForm,
  SizeForm,
  FontForm,
  TextShadowForm,
  TransformForm,
  TransitionForm
} from './Forms';

const formMapper = {
  'Backdrop Filter': BackdropFilterForm,
  'Background Color': BackgroundColorForm,
  Border: BorderForm,
  'Border Radius': BorderRadiusForm,
  'Box Shadow': BoxShadowForm,
  Filter: FilterForm,
  Font: FontForm,
  Margin: MarginForm,
  Outline: OutlineForm,
  Padding: PaddingForm,
  Size: SizeForm,
  'Text Shadow': TextShadowForm,
  Transform: TransformForm,
  Transition: TransitionForm
};

const GeneratorForm = ({ style, onChange }) => {
  const [type, setType] = useState('Border');

  const CSSForm = formMapper[type];
  const attributeValues = Object.keys(formMapper).map(label => ({ label, selected: false }));

  return (
    <div className="container--center flex--vertical">
      <div className="flex--horizontal">
        <Dropdown
          label="Select CSS Attributes"
          values={attributeValues}
          onChange={({ values}) => {
            const matched = values.find(item => item.selected);
            setType(matched.label);
          }}
        />
        <label className="generator__form-title">Option {type}</label>
      </div>
      <div className="generator__form-selected-option">
        <CSSForm type="Border" style={style} onChange={onChange} />
      </div>
    </div>
  );
};

export default GeneratorForm;

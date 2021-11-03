import React, { useState } from 'react';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import {
  BackdropFilterForm,
  BorderForm,
  BorderRadiusForm,
  BoxShadowForm,
  ColorForm,
  FilterForm,
  MarginForm,
  OutlineForm,
  PaddingForm,
  SizeForm,
  TextForm,
  TransformForm,
  TransitionForm
} from './Forms';

const formMapper = {
  BackdropFilter: BackdropFilterForm,
  Border: BorderForm,
  BorderRadius: BorderRadiusForm,
  BoxShadow: BoxShadowForm,
  Color: ColorForm,
  Filter: FilterForm,
  Margin: MarginForm,
  Outline: OutlineForm,
  Padding: PaddingForm,
  Size: SizeForm,
  Text: TextForm,
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

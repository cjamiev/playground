import React, { useState } from 'react';
import Button from 'components/button';
import {
  BackdropFilterForm,
  BorderForm,
  BoxShadowForm,
  BackgroundColorForm,
  FilterForm,
  MarginPaddingForm,
  OutlineForm,
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
  'Box Shadow': BoxShadowForm,
  Filter: FilterForm,
  Font: FontForm,
  'Margin & Padding': MarginPaddingForm,
  Outline: OutlineForm,
  Size: SizeForm,
  'Text Shadow': TextShadowForm,
  Transform: TransformForm,
  Transition: TransitionForm
};

const GeneratorForm = ({ style, onChange }) => {
  const [type, setType] = useState('Border');

  const CSSForm = formMapper[type];
  const attributeButtons = Object.keys(formMapper).map((label) => {
    return (
      <Button
        key={label}
        label={label}
        isPrimary
        onClick={() => {
          setType(label);
        }}
      />
    );
  });

  return (
    <div className="generator__form-options">
      <div className="flex--vertical">{attributeButtons}</div>
      <div className="generator__form-fields">
        <div className="container--center generator__form-selected-option">
          <label className="generator__form-title">Option {type}</label>
          <CSSForm type="Border" style={style} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default GeneratorForm;

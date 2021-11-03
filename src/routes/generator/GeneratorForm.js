import React, { useState } from 'react';
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
  const btns = Object.keys(formMapper).map(t => {
    return (
      <div
        key={t}
        onClick={() => { setType(t);}}>
        {t}
      </div>
    );
  });

  return (
    <div className="flex--horizontal">
      <div className="flex--vertical flex--one">
        {btns}
      </div>
      <div className="container--center flex--vertical flex--three">
        <CSSForm type="Border" style={style} onChange={onChange} />
      </div>
    </div>
  );
};

export default GeneratorForm;

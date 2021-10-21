import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilesByRegex } from './projectActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';
import NumberRange from 'components/form/NumberRange';

export const MODIFIER_TYPES = [
  { label: 'Global', value: 'g', selected: false },
  { label: 'Case Insensitive', value: 'i', selected: false },
  { label: 'Multiline', value: 'm', selected: false }
];

export const formRegex = (expression, modifiers) => {
  try {
    return { regex: new RegExp(expression, modifiers), isValid: true };
  } catch (e) {
    return { regex: '', isValid: false };
  }
};

const ZERO = 0;

const Regex = ({ root }) => {
  const dispatch = useDispatch();
  const [fileRegex, setFileRegex] = useState('');
  const [lineRegex, setLineRegex] = useState('');
  const [replace, setReplace] = useState('');
  const [modifier, setModifier] = useState(MODIFIER_TYPES);
  const [lineRange, setLineRange] = useState({ start: '', end: ''});
  const [rangeError, setRangeError] = useState('');

  const selectedModifiers = modifier
    .filter((item) => item.selected)
    .map((item) => item.value)
    .join('');
  const fileRegExp = formRegex(fileRegex);
  const lineRegExp = formRegex(lineRegex, selectedModifiers);

  return (
    <div className="flex--vertical">
      <Text
        label="File Regex"
        error={!fileRegExp.isValid}
        errorMessage="Not valid regex expression"
        selected={fileRegex}
        onChange={({ selected }) => {
          setFileRegex(selected);
        }}
      />
      <Text
        label="Line Regex"
        error={!lineRegExp.isValid}
        errorMessage="Not valid regex expression"
        selected={lineRegex}
        onChange={({ selected }) => {
          setLineRegex(selected);
        }}
      />
      <Text
        label="Replace"
        selected={replace}
        onChange={({ selected }) => {
          setReplace(selected);
        }}
      />
      <NumberRange
        label="Substring"
        selected={lineRange}
        error={rangeError}
        min={ZERO}
        max={100}
        onChange={({ selected, error }) => {
          setLineRange(selected);
          setRangeError(error);
        }}
      />
      <Checkbox
        label="Select Modifier(s)"
        values={modifier}
        onChange={({ values }) => {
          setModifier(values);
        }}
      />
      <Button
        classColor="primary"
        label="Submit"
        onClick={() => {
          if(fileRegExp.isValid && lineRegExp.isValid && !rangeError) {
            dispatch(updateFilesByRegex(
              root,
              {
                fileRegex,
                lineRegex,
                modifiers: selectedModifiers,
                lineRange,
                replace
              }
            ));
          }
        }}
      />
    </div>
  );
};

export default Regex;

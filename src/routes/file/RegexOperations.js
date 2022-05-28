import React, { useState } from 'react';
import Button, { InfoButton } from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';
import NumberRange from 'components/form/NumberRange';
import { MODIFIER_TYPES, regexInfo, formRegex, parsedContent } from './helper';
import { copyToClipboard } from 'helper/copy';

const ZERO = 0;

const RegexOperations = ({ content, onChange }) => {
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [modifier, setModifier] = useState(MODIFIER_TYPES);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const selectedModifiers = modifier
    .filter((item) => item.selected)
    .map((item) => item.value)
    .join('');
  const searchExpDisplay = `/${find}/${selectedModifiers}`;
  const searchExp = formRegex(find, selectedModifiers);

  return (
    <div className="flex--vertical">
      <h3>
        {' '}
        Regex <InfoButton content={regexInfo()} />{' '}
      </h3>
      <Text
        label="Search"
        error={!searchExp.isValid}
        errorMessage="Not valid regex expression"
        selected={find}
        onChange={({ selected }) => {
          setFind(selected);
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
        selected={{ start, end }}
        min={ZERO}
        max={content.length}
        onChange={({ selected }) => {
          setStart(selected.start);
          setEnd(selected.end);
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
        isPrimary
        label="Convert"
        onClick={() => {
          onChange(parsedContent({ content, replace, range: { start, end }, searchExp }));
        }}
      />
      <Button
        label="Copy RegEx"
        onClick={() => {
          copyToClipboard(searchExpDisplay);
        }}
      />
    </div>
  );
};

export default RegexOperations;

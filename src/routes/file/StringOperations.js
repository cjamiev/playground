import React, { useState } from 'react';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import { sortByDelimiter, sortDescendingByDelimiter } from 'sort';
import { DELIMITER_TYPES, MODIFIER_TYPES } from './helper';

const StringOperations = ({ content, onChange }) => {
  const [delimiters, setDelimiters] = useState(DELIMITER_TYPES);
  const [modifier, setModifier] = useState(MODIFIER_TYPES);

  const selectedDelimiter = delimiters.find((item) => item.selected);
  const selectedModifiers = modifier
    .filter((item) => item.selected)
    .map((item) => item.value)
    .join('');

  return (
    <div className="flex--vertical">
      <h3> String </h3>
      <Dropdown
        label="Delimiter"
        values={delimiters}
        onChange={({ values }) => {
          setDelimiters(values);
        }}
      />
      <Button
        label="Sort Asc"
        classColor="secondary"
        onClick={() => {
          onChange(sortByDelimiter(content, selectedDelimiter.value));
        }}
      />
      <Button
        label="Sort Desc"
        classColor="secondary"
        onClick={() => {
          onChange(sortDescendingByDelimiter(content, selectedDelimiter.value));
        }}
      />
      <Button
        label="Split"
        classColor="secondary"
        onClick={() => {
          onChange(content.split(selectedDelimiter.value).join('\n'));
        }}
      />
      <Button
        label="Join"
        classColor="secondary"
        onClick={() => {
          onChange(content.split('\n').join(selectedDelimiter.value));
        }}
      />
      <Button
        label="Trim"
        classColor="secondary"
        onClick={() => {
          onChange(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' '));
        }}
      />
    </div>
  );
};

export default StringOperations;

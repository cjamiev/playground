import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject, updateFilesByRegex } from './projectActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';
import NumberRange from 'components/form/NumberRange';
import Dropdown from 'components/form/Dropdown';

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

const Regex = ({ root, directories, regexes }) => {
  const dispatch = useDispatch();
  const [regexKeys, setRegexKeys] = useState([]);
  const [description, setDescription] = useState('');
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


  useEffect(() => {
    const REGEX_KEYS = regexes.map(r => {
      return { label: r.description, value: r, selected: false };
    });
    setRegexKeys(REGEX_KEYS);
  }, [regexes]);

  return (
    <div className="flex--vertical">
      <Dropdown
        label="Regexes"
        values={regexKeys}
        onChange={({ values }) => {
          const selected = values.find(item => item.selected);

          setDescription(selected.value.description);
          setFileRegex(selected.value.fileRegex);
          setLineRegex(selected.value.lineRegex);
          setLineRange(selected.value.lineRange);
          setReplace(selected.value.replace);
          setModifier(modifier.map(item => {
            return {
              ...item,
              selected: selected.value.modifiers.includes(item.value)
            };
          }));
        }}
      />
      <Text
        label="Description"
        selected={description}
        onChange={({ selected }) => {
          setDescription(selected);
        }}
      />
      <div className="flex--horizontal">
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
      </div>
      <Checkbox
        label="Select Modifier(s)"
        values={modifier}
        onChange={({ values }) => {
          setModifier(values);
        }}
      />
      <div className="flex--horizontal">
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
        <Button
          classColor="secondary"
          label="Save"
          onClick={() => {
            if(fileRegExp.isValid && lineRegExp.isValid && !rangeError && description) {
              const updatedRegexes = regexes.find(item => item.description === description)
                ? regexes.map(item => {
                  if(item.description === description) {
                    return {
                      description,
                      fileRegex,
                      lineRegex,
                      modifiers: selectedModifiers,
                      lineRange,
                      replace
                    };
                  }

                  return item;
                })
                : regexes.concat([{
                  description,
                  fileRegex,
                  lineRegex,
                  modifiers: selectedModifiers,
                  lineRange,
                  replace
                }]);
              dispatch(updateProject({ directories, regexes: updatedRegexes }));
            }
          }}
        />
        <Button
          classColor="secondary"
          label="Delete"
          onClick={() => {
            if(description) {
              const updatedRegexes = regexes.filter(item => item.description !== description);
              dispatch(updateProject({ directories, regexes: updatedRegexes }));
            }
          }}
        />
      </div>
    </div>
  );
};

export default Regex;

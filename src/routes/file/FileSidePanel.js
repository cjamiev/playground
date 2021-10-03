import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFileSidePanel, writeFileSidePanel } from './fileActions';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Button, { IconButton, InfoButton } from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import Switch from 'components/switch';
import Checkbox from 'components/form/Checkbox';
import NumberRange from 'components/form/NumberRange';
import { ICON_TYPES } from 'constants/icon';
import { copyToClipboard } from 'helper/copy';
import { sortByDelimiter, sortDescendingByDelimiter } from 'sort';
import { parseObject, isJSONString, isNumber } from 'type-check';
import './file.css';

const REGEX_INFO = () => {
  return (<>
    <p>group: [abc]</p>
    <p>group negate: [^abc]</p>
    <p>group range: [a-z]</p>
    <p>or: a|b</p>
    <p>any except \n: .</p>
    <p>at least one: a+</p>
    <p>zero or more: a* </p>
    <p>zero or one: a?</p>
    <p>exactly n of a: a&#123;n&#125;</p>
    <p>n or more of a: a&#123;n,&#125;</p>
    <p>n to m of a: a&#123;n,m&#125;</p>
    <p>start of: ^</p>
    <p>end of: $</p>
    <p>newline: \n</p>
    <p>carriage: \r</p>
    <p>tab: \t</p>
    <p>null: \0</p>
    <p>\d = digit</p>
    <p>\w = alphanumeric</p>
    <p>\s = space, tab, newline, etc</p>
    <p>\D = not \d</p>
    <p>\W = not \w</p>
    <p>\S = not \s</p>
  </>);
};
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const DELIMITER_TYPES = [
  { label:'comma', value: ',', selected: true },
  { label:'space', value: ' ', selected: false },
  { label:'new line', value: '\n', selected: false }
];
const MODIFIER_TYPES = [
  { label: 'Global', value: 'g', selected: false },
  { label: 'Case Insensitive', value: 'i', selected: false },
  { label: 'Multiline', value: 'm', selected: false }
];

const formRegex = (expression, modifiers) => {
  try {
    return { regex: new RegExp(expression,modifiers), isValid: true };
  } catch (e) {
    return { regex: '', isValid: false };
  }
};

const parsedContent = ({content, replace, range, searchExp}) => {
  if(!searchExp.isValid) {
    return content;
  }

  return content.replace(searchExp.regex, (matchedKey) => {
    const startIndex = isNumber(Number(range.start)) ? Number(range.start) : ZERO;
    const endIndex = isNumber(Number(range.end)) ? Number(range.end) : content.length;
    if(endIndex && endIndex !== content.length) {
      return matchedKey.substr(startIndex,endIndex) + replace;
    }

    return replace || '';
  });
};

const FileSidePanel = ({ content, onChange }) => {
  const dispatch = useDispatch();
  const [delimiters, setDelimiters] = useState(DELIMITER_TYPES);
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [modifier, setModifier] = useState(MODIFIER_TYPES);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const selectedDelimiter = delimiters.find(item => item.selected);
  const selectedModifiers = modifier.filter(item => item.selected).map(item => item.value ).join('');
  const searchExpDisplay = `/${find}/${selectedModifiers}`;
  const searchExp = formRegex(find,selectedModifiers);

  return (
    <div className="container--center">
      <h2> String Operations </h2>
      <Dropdown label='Delimiter' values={delimiters} onChange={({ values }) => { setDelimiters(values); }} />
      <Button label='Sort Asc' classColor='secondary' onClick={() => { onChange(sortByDelimiter(content, selectedDelimiter.value)); }} />
      <Button label='Sort Desc' classColor='secondary' onClick={() => { onChange(sortDescendingByDelimiter(content, selectedDelimiter.value)); }} />
      <Button label='Split' classColor='secondary' onClick={() => { onChange(content.split(selectedDelimiter.value).join('\n')); }} />
      <Button label='Join' classColor='secondary' onClick={() => { onChange(content.split('\n').join(selectedDelimiter.value)); }} />
      <Button label='Trim' classColor='secondary' onClick={() => { onChange(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' ')); }} />
      <h2> JSON</h2>
      <Button label='Validate'
        classColor='secondary'
        onClick={() => {
          dispatch(dismissAlert());
          const isValid = isJSONString(content);
          if(isValid) {
            onChange(JSON.stringify(JSON.parse(content), undefined, TWO));
          }
          const message = isValid ? 'Is Valid JSON' : 'Is NOT Valid JSON';
          const status = isValid ? 'success' : 'error';
          dispatch(createAlert({ content: message, status }));
        }} />
      <Button label='Stringify'
        classColor='secondary'
        onClick={() => {
          onChange(
            JSON.stringify(content)
              .replace(/\\n/g,'')
              .replace(/"/g,'\'')
              .replace(/\\'/g,'\"')
              .replace(/\w+:/g, matched => {
                return `"${matched.replace(':','')}":`;
              })
          );
        }} />
      <Button label='Parse'
        classColor='secondary'
        onClick={() => {
          const parsed = parseObject(content
            .replace(/\"/g,'\\"')
            .replace(/\'/g,'\"'));
          if(parsed) {
            onChange(parsed);
          }
        }} />
      <Button label='Object'
        classColor='secondary'
        onClick={() => {
          const result = content
            .replace(/['|"]{/g,'{')
            .replace(/}['|"]/g,'}')
            .replace(/["]\w+["]:/g, matched => {
              return matched.replace(/["]/g,'');
            });
          onChange(result);
        }} />
      <h2> Regex <InfoButton content={REGEX_INFO()} /></h2>
      <Text label='Search' error={!searchExp.isValid} errorMessage='Not valid regex expression' selected={find} onChange={({selected}) => { setFind(selected); }} />
      <Text label='Replace' selected={replace} onChange={({selected}) => { setReplace(selected); }} />
      <NumberRange label='Substring' selected={ {start, end} } min={ZERO} max={content.length}
        onChange={({selected}) => {
          setStart(selected.start);
          setEnd(selected.end);
        }}
      />
      <Checkbox label='Select Modifier(s)' values={modifier} onChange={({values}) => { setModifier(values);}} />
      <Button classColor="primary" label='Convert' onClick={() => { onChange(parsedContent({content, replace, range: { start, end}, searchExp}));}} />
      <Button classColor="secondary" label='Copy RegEx' onClick={() => { copyToClipboard(searchExpDisplay); }} />
    </div>
  );
};

export default FileSidePanel;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Button, { InfoButton } from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import Radio from 'components/form/Radio';
import Checkbox from 'components/form/Checkbox';
import NumberRange from 'components/form/NumberRange';
import { copyToClipboard } from 'helper/copy';
import { sortByDelimiter, sortDescendingByDelimiter } from 'sort';
import { parseObject, isJSONString } from 'type-check';
import {
  OPERATION_TYPES,
  DELIMITER_TYPES,
  MODIFIER_TYPES,
  regexInfo,
  formRegex,
  parsedContent
} from './helper';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const FileSidePanel = ({ content, onChange }) => {
  const dispatch = useDispatch();
  const [ops, setOps] = useState(OPERATION_TYPES);
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
  const selectedOp = ops.find(item => item.selected).value;

  return (
    <div className="container--center">
      <Radio label='Select Operation' values={ops} onChange={({values}) => { setOps(values);}} />
      {selectedOp === ZERO && <div>
        <h3> String </h3>
        <Dropdown label='Delimiter' values={delimiters} onChange={({ values }) => { setDelimiters(values); }} />
        <Button label='Sort Asc' classColor='secondary' onClick={() => { onChange(sortByDelimiter(content, selectedDelimiter.value)); }} />
        <Button label='Sort Desc' classColor='secondary' onClick={() => { onChange(sortDescendingByDelimiter(content, selectedDelimiter.value)); }} />
        <Button label='Split' classColor='secondary' onClick={() => { onChange(content.split(selectedDelimiter.value).join('\n')); }} />
        <Button label='Join' classColor='secondary' onClick={() => { onChange(content.split('\n').join(selectedDelimiter.value)); }} />
        <Button label='Trim' classColor='secondary' onClick={() => { onChange(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' ')); }} />
      </div>}
      {selectedOp === ONE && <div>
        <h3> JSON</h3>
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
      </div>}
      {selectedOp === TWO && <div>
        <h3> Regex <InfoButton content={regexInfo()} /></h3>
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
      </div>}
    </div>
  );
};

export default FileSidePanel;

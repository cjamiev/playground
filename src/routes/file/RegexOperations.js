import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import Button, { InfoButton } from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';
import NumberRange from 'components/form/NumberRange';
import { MODIFIER_TYPES, regexInfo, formRegex, parsedContent } from './helper';
import { copyToClipboard } from 'helper/copy';
import { SCFlexWrapper, SCTitleWrapper, SCFileBtnWrapper } from './styles';
import { InfoSVG } from 'components/icons/InfoSVG';

const ZERO = 0;

const RegexOperations = ({ content, onChange }) => {
  const dispatch = useDispatch();
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [modifier, setModifier] = useState(MODIFIER_TYPES);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const showRegexContent = () => {
    dispatch(
      openGlobalModal({
        title: 'Info',
        message: regexInfo()
      })
    );
  };

  const selectedModifiers = modifier
    .filter((item) => item.selected)
    .map((item) => item.value)
    .join('');
  const searchExpDisplay = `/${find}/${selectedModifiers}`;
  const searchExp = formRegex(find, selectedModifiers);

  return (
    <SCFlexWrapper isVertical>
      <SCTitleWrapper>
        <h3>Regex</h3>
        <svg
          aria-label="Regex Info"
          width="27"
          height="27"
          viewBox="0 0 106 106"
          onClick={() => {
            showRegexContent();
          }}
        >
          <InfoSVG />
        </svg>
      </SCTitleWrapper>
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
      <SCFileBtnWrapper>
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
      </SCFileBtnWrapper>
    </SCFlexWrapper>
  );
};

export default RegexOperations;

import React, { useState } from 'react';
import Page from 'components/layout';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color, { hexToRGB } from 'components/form/Color';
import { AccordionGroup } from 'components/accordion';
import Range from 'components/form/Range';
import GeneratorForm from './GeneratorForm';
import { copyToClipboard } from 'helper/copy';
import { toDashCaseFromCamelCase } from 'stringHelper';
import './generator.css';

const mapCSSFromJSON = (style, name) => {
  const cssProperties = Object.keys(style);
  const mergedProperties = cssProperties
    .map(key => {
      return `  ${toDashCaseFromCamelCase(key)}: ${style[key]};\n`;
    })
    .join('');

  return `${name} {\n${mergedProperties}}`;
};

const Generator = () => {
  const [isHoverMode, setIsHoverMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [style, setStyle] = useState({});
  const [hoverStyle, setHoverStyle] = useState({});
  const [parentBackgroundColor, setParentBackgroundColor] = useState('#ffffff');

  const styleCSS = mapCSSFromJSON(style, '.name');
  const hoverCSS = mapCSSFromJSON(hoverStyle, '.name:hover');
  const generatedCSS = `${styleCSS}\n\n${hoverCSS}`;
  const boxStyle = isHoverMode || isHovering ? {
    ...style,
    ...hoverStyle
  } : style;

  const handleChange = (updatedStyle) => {
    if(isHoverMode) {
      setHoverStyle(updatedStyle);
    }
    else {
      setStyle(updatedStyle);
    }
  };

  const handleParentBackgroundColorChange = ({ selected }) => {
    setParentBackgroundColor(selected);
  };

  return (
    <Page>
      <div className="generator">
        <div className="generator__form_container">
          <Button
            label={ isHoverMode ? 'Hover Mode' :'Normal Mode' }
            classColor={ isHoverMode ? 'secondary' :'primary' }
            onClick={
              () => {
                setIsHoverMode(!isHoverMode);
                setIsHovering(false);
              }
            } />
          <GeneratorForm onChange={handleChange} />
        </div>
        <div className="generator__result_container">
          <Color label="Parent Color" selected={parentBackgroundColor} onChange={handleParentBackgroundColorChange} />
          <div style={{ backgroundColor: parentBackgroundColor }} className="generator__box_parent">
            <div
              style={boxStyle}
              onMouseOver={() => { !isHoverMode && setIsHovering(true);}}
              onMouseOut={() => { !isHoverMode && setIsHovering(false);}}>
              Text
            </div>
          </div>
        </div>
        <div className="generator__output_container">
          <pre className="generator__generated_css">{generatedCSS}</pre>
          <Button
            label="Copy"
            classColor="primary"
            onClick={
              () => {
                copyToClipboard(generatedCSS);
              }
            } />
        </div>
      </div>
    </Page>
  );
};

export default Generator;

import React, { useState } from 'react';
import Page from 'components/layout';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color, { hexToRGB } from 'components/form/Color';
import { AccordionGroup } from 'components/accordion';
import Range from 'components/form/Range';
import { copyToClipboard } from 'helper/copy';
import GeneratorForm from './GeneratorForm';
import { toDashCaseFromCamelCase } from 'stringHelper';
import './generator.css';

const getCSSFromJSON = (style) => {
  const cssProperties = Object.keys(style);
  return cssProperties
    .map(key => {
      return `${toDashCaseFromCamelCase(key)}: ${style[key]};\n`;
    })
    .join('');
};

const Generator = () => {
  const [isHoverMode, setIsHoverMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [style, setStyle] = useState(
    {
      border: '1px solid #000000',
      borderRadius: '0px 0px 0px 0px',
      boxShadow: '0px 0px 0px 0px #ffffff',
      backgroundColor: 'rgba(255,255,255,1)',
      color: '#000000',
      fontSize: '16px',
      textAlign: 'initial',
      textShadow: '0px 0px 0px #ffffff',
      margin: '0px 0px 0px 0px',
      padding: '0px 0px 0px 0px',
      width: '100px',
      height: '50px'
    }
  );
  const [hoverStyle, setHoverStyle] = useState(
    {
      border: '1px solid #000000',
      borderRadius: '0px 0px 0px 0px',
      boxShadow: '0px 0px 0px 0px #ffffff',
      backgroundColor: 'rgba(255,255,255,1)',
      color: '#000000',
      fontSize: '16px',
      textAlign: 'initial',
      textShadow: '0px 0px 0px #ffffff',
      margin: '0px 0px 0px 0px',
      padding: '0px 0px 0px 0px',
      width: '100px',
      height: '50px'
    }
  );

  const handleChange = (updatedStyle) => {
    if(isHoverMode) {
      setHoverStyle(updatedStyle);
    }
    else {
      setStyle(updatedStyle);
    }
  };

  const styleCSS = getCSSFromJSON(style);
  const hoverCSS = getCSSFromJSON(hoverStyle);
  const boxStyle = isHoverMode || isHovering ? {
    ...style,
    ...hoverStyle
  } : style;

  return (
    <Page>
      <div className="generator">
        <div className="generator__form_container">
          <Button
            label={ !isHoverMode ? 'Normal' :'Hover' }
            classColor={ !isHoverMode ? 'secondary' :'primary' }
            onClick={
              () => {
                setIsHoverMode(!isHoverMode);
                setIsHovering(false);
              }
            } />
          <GeneratorForm onChange={handleChange} />
        </div>
        <div className="generator__visual_output">
          <div
            style={boxStyle}
            onMouseOver={() => { !isHoverMode && setIsHovering(true);}}
            onMouseOut={() => { !isHoverMode && setIsHovering(false);}}>
              Text
          </div>
        </div>
        <div className="generator__css_output">
          <pre className="generator__generated_css">{styleCSS}</pre>
          <pre className="generator__generated_css">{hoverCSS}</pre>
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

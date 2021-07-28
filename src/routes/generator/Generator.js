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

const baseStyle = {
  borderThickness: '1',
  borderStyle: 'solid',
  borderColor: '#000000',
  topLeftRadius: '0',
  topRightRadius: '0',
  bottomRightRadius: '0',
  bottomLeftRadius: '0',
  horizontalBoxShadow: '0',
  verticalBoxShadow: '0',
  blurRadiusBoxShadow: '0',
  spreadBoxShadow: '0',
  colorBoxShadow: '#ffffff',
  backgroundColor: '#ffffff',
  opacity: '100',
  fontColor: '#000000',
  fontSize: '16',
  textAlign: 'initial',
  horizontalTextShadow: '0',
  verticalTextShadow: '0',
  blurRadiusTextShadow: '0',
  colorTextShadow: '#ffffff',
  marginTop: '0',
  marginRight: '0',
  marginBottom: '0',
  marginLeft: '0',
  paddingTop: '0',
  paddingRight: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  width: '100',
  height: '50'
};
const OPACITY_MAX = 100;

const mapCSSFromJSON = (style, name) => {
  const cssProperties = Object.keys(style);
  const mergedProperties = cssProperties
    .map(key => {
      return `  ${toDashCaseFromCamelCase(key)}: ${style[key]};\n`;
    })
    .join('');

  return `${name} {\n${mergedProperties}}`;
};

const getInlineStyle = ({
  borderThickness,
  borderStyle,
  borderColor,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  horizontalBoxShadow,
  verticalBoxShadow,
  blurRadiusBoxShadow,
  spreadBoxShadow,
  colorBoxShadow,
  backgroundColor,
  opacity,
  fontColor,
  fontSize,
  textAlign,
  horizontalTextShadow,
  verticalTextShadow,
  blurRadiusTextShadow,
  colorTextShadow,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  width,
  height
}) => {
  const radiusTopLeft = topLeftRadius ? `${topLeftRadius}px`: '0';
  const radiusTopRight = topRightRadius ? `${topRightRadius}px`: '0';
  const radiusBottomRight = bottomRightRadius ? `${bottomRightRadius}px`: '0';
  const radiusBottomLeft = bottomLeftRadius ? `${bottomLeftRadius}px`: '0';
  const rgbColor = hexToRGB(backgroundColor);
  const normalizedOpacity = Number(opacity) / OPACITY_MAX;

  return {
    border: `${borderThickness}px ${borderStyle} ${borderColor}`,
    borderRadius: `${radiusTopLeft} ${radiusTopRight} ${radiusBottomRight} ${radiusBottomLeft}`,
    boxShadow: `${horizontalBoxShadow}px ${verticalBoxShadow}px ${blurRadiusBoxShadow}px ${spreadBoxShadow}px ${colorBoxShadow}`,
    backgroundColor: `rgba(${rgbColor.red},${rgbColor.green},${rgbColor.blue},${normalizedOpacity})`,
    color: fontColor,
    fontSize: `${fontSize}px`,
    textAlign,
    textShadow: `${horizontalTextShadow}px ${verticalTextShadow}px ${blurRadiusTextShadow}px ${colorTextShadow}`,
    margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
    width: `${width}px`,
    height: `${height}px`
  };
};

const Generator = () => {
  const [isHoverMode, setIsHoverMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [style, setStyle] = useState(baseStyle);
  const [hoverStyle, setHoverStyle] = useState(baseStyle);
  const [parentBackgroundColor, setParentBackgroundColor] = useState('#ffffff');

  const inlineNormalStyle = getInlineStyle(style);
  const inlineHoverStyle = getInlineStyle(hoverStyle);
  const styleCSS = mapCSSFromJSON(inlineNormalStyle, '.name');
  const hoverCSS = mapCSSFromJSON(inlineHoverStyle, '.name:hover');
  const generatedCSS = `${styleCSS}\n\n${hoverCSS}`;
  const boxStyle = isHoverMode || isHovering ? {
    ...inlineNormalStyle,
    ...inlineHoverStyle
  } : inlineNormalStyle;

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
          <GeneratorForm baseStyle={isHoverMode ? hoverStyle : style} onChange={handleChange} />
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

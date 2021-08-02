import React, { useState } from 'react';
import Page from 'components/layout';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color, { hexToRGB } from 'components/form/Color';
import { AccordionGroup } from 'components/accordion';
import Range from 'components/form/Range';
import Switch from 'components/switch';
import GeneratorForm from './GeneratorForm';
import { copyToClipboard } from 'helper/copy';
import { toDashCaseFromCamelCase } from 'stringHelper';
import {
  OPACITY_MAX
} from 'constants/css';
import './generator.css';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const toCssString = (style) => {
  const cssProperties = Object.keys(style);
  const mergedProperties = cssProperties
    .map(key => {
      return `  ${toDashCaseFromCamelCase(key)}: ${style[key]};\n`;
    })
    .join('');

  return mergedProperties;
};

const getFilterProperty = ({ blur, brightness, contrast, grayscale, hueRotate, invert, saturate }) => {
  const filterBlur = blur ? `blur(${blur}px) ` : '';
  const filterBrightness = brightness ? `brightness(${brightness}%) ` : '';
  const filterContrast = contrast ? `contrast(${contrast}%)  ` : '';
  const filterGrayscale = grayscale ? `grayscale(${grayscale}%)  ` : '';
  const filterHueRotate = hueRotate ? `hue-rotate(${hueRotate}deg)  ` : '';
  const filterInvert = invert ? `invert(${invert}%)  ` : '';
  const filterSaturate = saturate ? `saturate(${saturate}%)  ` : '';

  return `${filterBlur}${filterBrightness}${filterContrast}${filterGrayscale}${filterHueRotate}${filterInvert}${filterSaturate}`;
};
const getTransformProperty = ({ rotate, translateX, translateY, scaleX, scaleY, skewX, skewY }) => {
  const transformRotate = rotate ? `rotate(${rotate}deg) ` : '';
  const transformTranslateX = translateX ? `translateX(${translateX}px) ` : '';
  const transformTranslateY = translateY ? `translateY(${translateY}px) ` : '';
  const transformScaleX = scaleX ? `scaleX(${scaleX}) ` : '';
  const transformScaleY = scaleY ? `scaleY(${scaleY}) ` : '';
  const transformSkewX = skewX ? `skewX(${skewX}deg) ` : '';
  const transformSkewY = skewY ? `skewY(${skewY}deg) ` : '';

  return `${transformRotate}${transformTranslateX}${transformTranslateY}${transformScaleX}${transformScaleY}${transformSkewX}${transformSkewY}`;
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
  blur,
  brightness,
  contrast,
  grayscale,
  hueRotate,
  invert,
  saturate,
  rotate,
  translateX,
  translateY,
  scaleX,
  scaleY,
  skewX,
  skewY,
  transitionProperty,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay,
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
  const rgbColor = backgroundColor ? hexToRGB(backgroundColor) : {};
  const normalizedOpacity = Number(opacity) / OPACITY_MAX;

  const style = {
    border: `${borderThickness}px ${borderStyle} ${borderColor}`,
    borderRadius: `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`,
    boxShadow: `${horizontalBoxShadow}px ${verticalBoxShadow}px ${blurRadiusBoxShadow}px ${spreadBoxShadow}px ${colorBoxShadow}`,
    backgroundColor: `rgba(${rgbColor.red},${rgbColor.green},${rgbColor.blue},${normalizedOpacity || ONE})`,
    color: fontColor,
    fontSize: `${fontSize}px`,
    textAlign,
    filter: getFilterProperty({ blur, brightness, contrast, grayscale, hueRotate, invert, saturate }),
    textShadow: `${horizontalTextShadow}px ${verticalTextShadow}px ${blurRadiusTextShadow}px ${colorTextShadow}`,
    transform: getTransformProperty({ rotate, translateX, translateY, scaleX, scaleY, skewX, skewY }),
    transition: `${transitionProperty} ${transitionDuration}s ${transitionTimingFunction} ${transitionDelay}s`,
    margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
    width: !isNaN(width) ? `${width}px`: width,
    height: !isNaN(height) ? `${height}px`: height
  };

  const definedProperties = Object
    .keys(style)
    .filter(key => {
      if(!style[key]) {
        return false;
      }
      else if(style[key].includes('undefined')) {
        return false;
      }

      return true;
    })
    .reduce((accumulator, key) => {
      return { [key]: style[key], ...accumulator };
    }, {});

  return definedProperties;
};

const Generator = () => {
  const [mode, setMode] = useState(ZERO);
  const [isHovering, setIsHovering] = useState(false);
  const [normalStyle, setNormalStyle] = useState({
    borderThickness: '1',
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '100',
    height: '50'
  });
  const [hoverStyle, setHoverStyle] = useState({});
  const [parentBackgroundColor, setParentBackgroundColor] = useState('#ffffff');

  const isHoverMode = mode === ONE;
  const inlineNormalStyle = getInlineStyle(normalStyle);
  const inlineHoverStyle = getInlineStyle(hoverStyle);
  const normalCSS = toCssString(inlineNormalStyle);
  const hoverCSS = toCssString(inlineHoverStyle);
  const copyCSS = `.name {\n${normalCSS}}\n\n.name:hover {\n${hoverCSS}}`;
  const inlineStyle = (isHoverMode || isHovering)
    ? { ...inlineNormalStyle, ...inlineHoverStyle}
    : inlineNormalStyle;

  const handleChange = ({ id, selected, values }) => {
    if(isHoverMode) {
      const updatedStyle = values ?
        {
          ...hoverStyle,
          [id]: values.find(item => item.selected).label
        }
        : {
          ...hoverStyle,
          [id]: selected
        };
      setHoverStyle(updatedStyle);
    }
    else {
      const updatedStyle = values ?
        {
          ...normalStyle,
          [id]: values.find(item => item.selected).label
        }
        : {
          ...normalStyle,
          [id]: selected
        };
      setNormalStyle(updatedStyle);
    }
  };

  const handleParentBackgroundColorChange = ({ selected }) => {
    setParentBackgroundColor(selected);
  };

  const handleMode = (index) => {
    setMode(index);
  };

  return (
    <Page>
      <div className="generator">
        <div className="generator__form_container">
          <Switch data={[{ label: 'Normal'}, { label: 'Hover'}]} switchIndex={mode} onToggleSwitch={handleMode} />
          <GeneratorForm style={isHoverMode ? hoverStyle : normalStyle} onChange={handleChange} />
        </div>
        <div className="generator__result_container">
          <Color label="Parent Color" selected={parentBackgroundColor} onChange={handleParentBackgroundColorChange} />
          <div style={{ backgroundColor: parentBackgroundColor }} className="generator__box_parent">
            <div
              style={inlineStyle}
              onMouseOver={() => { !isHoverMode && setIsHovering(true);}}
              onMouseOut={() => { !isHoverMode && setIsHovering(false);}}>
              Text
            </div>
          </div>
        </div>
        <div className="generator__output_container">
          <Button
            label="Copy"
            classColor="primary"
            onClick={
              () => { copyToClipboard(copyCSS); }
            } />
          <Button
            label="Cache"
            classColor="secondary"
            onClick={
              () => { localStorage.setItem('generator', JSON.stringify({ normalStyle, hoverStyle, parentBackgroundColor })); }
            } />
          <Button
            label="Load"
            classColor="secondary"
            onClick={
              () => {
                const result = localStorage.getItem('generator') || '{}';
                const data = JSON.parse(result);
                data.normalStyle && setNormalStyle(data.normalStyle);
                data.hoverStyle && setHoverStyle(data.hoverStyle);
                data.parentBackgroundColor && setParentBackgroundColor(data.parentBackgroundColor);
              }
            } />
          <h2>Normal CSS</h2>
          <pre className="generator__generated_css">{normalCSS}</pre>
          <h2>Hover CSS</h2>
          <pre className="generator__generated_css">{hoverCSS}</pre>
        </div>
      </div>
    </Page>
  );
};

export default Generator;

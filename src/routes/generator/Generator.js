import React, { useState } from 'react';
import Page from 'components/layout';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color, { hexToRGB } from 'components/form/Color';
import Range from 'components/form/Range';
import { copyToClipboard } from 'helper/copy';
import { toDashCaseFromCamelCase } from 'stringHelper';
import './generator.css';

const THICKNESS_MAX = 10;
const BORDER_TYPES = [
  { label:'solid', selected: true},
  { label:'dotted', selected: false},
  { label:'dashed', selected: false},
  { label:'double', selected: false},
  { label:'groove', selected: false},
  { label:'ridge', selected: false},
  { label:'inset', selected: false},
  { label:'outset', selected: false},
  { label:'none', selected: false}
];
const OPACITY_MAX = 100;
const FONT_SIZE_MAX = 100;
const TEXT_ALIGN_TYPES = [
  { label: 'initial', selected: true },
  { label: 'left', selected: false },
  { label: 'right', selected: false },
  { label: 'center', selected: false },
  { label: 'justify', selected: false }
];
const WIDTH_MAX = 1000;
const HEIGHT_MAX = 1000;

const getBoxStyle = ({
  borderThickness,
  borderStyle,
  borderColor,
  horizontalBoxShadow,
  verticalBoxShadow,
  blurRadiusBoxShadow,
  spreadBoxShadow,
  colorBoxShadow,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  backgroundColor,
  opacity,
  fontColor,
  fontSize,
  textAlign,
  horizontalTextShadow,
  verticalTextShadow,
  blurRadiusTextShadow,
  colorTextShadow,
  margin,
  padding,
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
    margin,
    padding,
    width: `${width}px`,
    height: `${height}px`
  };
};

const getCSSFromJSON = (style) => {
  const cssProperties = Object.keys(style);
  return cssProperties
    .map(key => {
      return `${toDashCaseFromCamelCase(key)}: ${style[key]};\n`;
    })
    .join('');
};

const Generator = () => {
  const [borderThickness, setBorderThickness] = useState('1');
  const [borderValues, setBorderValues] = useState(BORDER_TYPES);
  const [borderColor, setBorderColor] = useState('#000000');
  const [topLeftRadius, setTopLeftRadius] = useState('0');
  const [topRightRadius, setTopRightRadius] = useState('0');
  const [bottomRightRadius, setBottomRightRadius] = useState('0');
  const [bottomLeftRadius, setBottomLeftRadius] = useState('0');
  const [horizontalBoxShadow, setHorizontalBoxShadow] = useState('0');
  const [verticalBoxShadow, setVerticalBoxShadow] = useState('0');
  const [blurRadiusBoxShadow, setBlurRadiusBoxShadow] = useState('0');
  const [spreadBoxShadow, setSpreadBoxShadow] = useState('0');
  const [colorBoxShadow, setColorBoxShadow] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState('100');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('16');
  const [textAlignValues, setTextAlignValues] = useState(TEXT_ALIGN_TYPES);
  const [horizontalTextShadow, setHorizontalTextShadow] = useState('0');
  const [verticalTextShadow, setVerticalTextShadow] = useState('0');
  const [blurRadiusTextShadow, setBlurRadiusTextShadow] = useState('0');
  const [colorTextShadow, setColorTextShadow] = useState('#ffffff');
  const [marginTop, setMarginTop] = useState('0');
  const [marginRight, setMarginRight] = useState('0');
  const [marginBottom, setMarginBottom] = useState('0');
  const [marginLeft, setMarginLeft] = useState('0');
  const [paddingTop, setPaddingTop] = useState('0');
  const [paddingRight, setPaddingRight] = useState('0');
  const [paddingBottom, setPaddingBottom] = useState('0');
  const [paddingLeft, setPaddingLeft] = useState('0');
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState('50');

  const handleBorderThicknessChange = ({ selected }) => {
    setBorderThickness(selected);
  };

  const handleBorderTypeChange = ({ values }) => {
    setBorderValues(values);
  };

  const handleBorderColorChange = ({ selected }) => {
    setBorderColor(selected);
  };

  const handleTopLeftRadiusChange = ({ selected }) => {
    setTopLeftRadius(selected);
  };

  const handleTopRightRadiusChange = ({ selected }) => {
    setTopRightRadius(selected);
  };

  const handleBottomRightRadiusChange = ({ selected }) => {
    setBottomRightRadius(selected);
  };

  const handleBottomLeftRadiusChange = ({ selected }) => {
    setBottomLeftRadius(selected);
  };

  const handleHorizontalBoxShadowChange = ({ selected }) => {
    setHorizontalBoxShadow(selected);
  };

  const handleVerticalBoxShadowChange = ({ selected }) => {
    setVerticalBoxShadow(selected);
  };

  const handleBlurRadiusBoxShadowChange = ({ selected }) => {
    setBlurRadiusBoxShadow(selected);
  };

  const handleSpreadBoxShadowChange = ({ selected }) => {
    setSpreadBoxShadow(selected);
  };

  const handleColorBoxShadowChange = ({ selected }) => {
    setColorBoxShadow(selected);
  };

  const handleBackgroundColorChange = ({ selected }) => {
    setBackgroundColor(selected);
  };

  const handleOpacityChange = ({ selected }) => {
    setOpacity(selected);
  };

  const handleFontColorChange = ({ selected }) => {
    setFontColor(selected);
  };

  const handleFontSizeChange = ({ selected }) => {
    setFontSize(selected);
  };

  const handleTextAlignValuesChange = ({ values }) => {
    setTextAlignValues(values);
  };

  const handleHorizontalTextShadowChange = ({ selected }) => {
    setHorizontalTextShadow(selected);
  };

  const handleVerticalTextShadowChange = ({ selected }) => {
    setVerticalTextShadow(selected);
  };

  const handleBlurRadiusTextShadowChange = ({ selected }) => {
    setBlurRadiusTextShadow(selected);
  };

  const handleColorTextShadowChange = ({ selected }) => {
    setColorTextShadow(selected);
  };

  const handleMarginTopChange = ({ selected }) => {
    setMarginTop(selected);
  };

  const handleMarginRightChange = ({ selected }) => {
    setMarginRight(selected);
  };

  const handleMarginBottomChange = ({ selected }) => {
    setMarginBottom(selected);
  };

  const handleMarginLeftChange = ({ selected }) => {
    setMarginLeft(selected);
  };

  const handlePaddingTopChange = ({ selected }) => {
    setPaddingTop(selected);
  };

  const handlePaddingRightChange = ({ selected }) => {
    setPaddingRight(selected);
  };

  const handlePaddingBottomChange = ({ selected }) => {
    setPaddingBottom(selected);
  };

  const handlePaddingLeftChange = ({ selected }) => {
    setPaddingLeft(selected);
  };

  const handleWidthChange = ({ selected }) => {
    setWidth(selected);
  };

  const handleHeightChange = ({ selected }) => {
    setHeight(selected);
  };

  const borderStyle = borderValues.find(item => item.selected).label;
  const textAlign = textAlignValues.find(item => item.selected).label;
  const margin = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;
  const padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
  const boxStyle = getBoxStyle({
    borderThickness,
    borderStyle,
    borderColor,
    horizontalBoxShadow,
    verticalBoxShadow,
    blurRadiusBoxShadow,
    spreadBoxShadow,
    colorBoxShadow,
    topLeftRadius,
    topRightRadius,
    bottomRightRadius,
    bottomLeftRadius,
    backgroundColor,
    opacity,
    fontColor,
    fontSize,
    textAlign,
    horizontalTextShadow,
    verticalTextShadow,
    blurRadiusTextShadow,
    colorTextShadow,
    margin,
    padding,
    width,
    height
  });
  const generatedCSS = getCSSFromJSON(boxStyle);

  return (
    <Page>
      <div className="generator__form_container">
        <div className="generator__form_column">
          <div className="generator__form_cell">
            <h2> Border </h2>
            <Range label="Thickness" min="0" max={THICKNESS_MAX} selected={borderThickness} onChange={handleBorderThicknessChange} />
            <Dropdown label={`Type: ${borderStyle}`} values={borderValues} onChange={handleBorderTypeChange} />
            <Color label="Color" selected={borderColor} onChange={handleBorderColorChange} />
          </div>
          <div className="generator__form_cell">
            <h2> Border Radius </h2>
            <Text label='Top Left' selected={topLeftRadius} onChange={handleTopLeftRadiusChange} />
            <Text label='Top Right' selected={topRightRadius} onChange={handleTopRightRadiusChange} />
            <Text label='Bottom Right' selected={bottomRightRadius} onChange={handleBottomRightRadiusChange} />
            <Text label='Bottom Left' selected={bottomLeftRadius} onChange={handleBottomLeftRadiusChange} />
          </div>
          <div className="generator__form_cell">
            <h2> Box Shadow </h2>
            <Text label='Horizontal' selected={horizontalBoxShadow} onChange={handleHorizontalBoxShadowChange} />
            <Text label='Vertical' selected={verticalBoxShadow} onChange={handleVerticalBoxShadowChange} />
            <Text label='Blur Radius' selected={blurRadiusBoxShadow} onChange={handleBlurRadiusBoxShadowChange} />
            <Text label='Spread' selected={spreadBoxShadow} onChange={handleSpreadBoxShadowChange} />
            <Color label="Color" selected={colorBoxShadow} onChange={handleColorBoxShadowChange} />
          </div>
        </div>
        <div className="generator__form_column">
          <div className="generator__form_cell">
            <h2> Size </h2>
            <Range label="Width" min="0" max={WIDTH_MAX} selected={width} onChange={handleWidthChange} />
            <Range label="Height" min="0" max={HEIGHT_MAX} selected={height} onChange={handleHeightChange} />
          </div>
          <div className="generator__form_cell">
            <h2> Color </h2>
            <Color label="BG Color" selected={backgroundColor} onChange={handleBackgroundColorChange} />
            <Range label="Opacity" min="0" max={OPACITY_MAX} selected={opacity} onChange={handleOpacityChange} />
          </div>
          <div className="generator__form_cell">
            <h2> Text </h2>
            <Color label="Font Color" selected={fontColor} onChange={handleFontColorChange} />
            <Range label="Font Size" min="0" max={FONT_SIZE_MAX} selected={fontSize} onChange={handleFontSizeChange} />
            <Dropdown label={`Text Align: ${textAlign}`} values={textAlignValues} onChange={handleTextAlignValuesChange} />
            <Text label='Horizontal' selected={horizontalTextShadow} onChange={handleHorizontalTextShadowChange} />
            <Text label='Vertical' selected={verticalTextShadow} onChange={handleVerticalTextShadowChange} />
            <Text label='Blur Radius' selected={blurRadiusTextShadow} onChange={handleBlurRadiusTextShadowChange} />
            <Color label="Text Shadow Color" selected={colorTextShadow} onChange={handleColorTextShadowChange} />
          </div>
        </div>
        <div className="generator__form_column">
          <div className="generator__form_cell">
            <h2> Content </h2>
            <Text label='Margin Top' selected={marginTop} onChange={handleMarginTopChange} />
            <Text label='Margin Right' selected={marginRight} onChange={handleMarginRightChange} />
            <Text label='Margin Bottom' selected={marginBottom} onChange={handleMarginBottomChange} />
            <Text label='Margin Left' selected={marginLeft} onChange={handleMarginLeftChange} />
            <Text label='Padding Top' selected={paddingTop} onChange={handlePaddingTopChange} />
            <Text label='Padding Right' selected={paddingRight} onChange={handlePaddingRightChange} />
            <Text label='Padding Bottom' selected={paddingBottom} onChange={handlePaddingBottomChange} />
            <Text label='Padding Left' selected={paddingLeft} onChange={handlePaddingLeftChange} />
          </div>
        </div>
      </div>
      <div className="generator__output_container">
        <div className="generator__visual_output">
          <div style={boxStyle}> Text </div>
        </div>
        <div className="generator__css_output">
          <Button
            label="Copy"
            classColor="primary"
            onClick={
              () => {
                copyToClipboard(generatedCSS);
              }
            } />
          <pre className="generator__generated_css">{generatedCSS.replace('{\n','').replace('}','')}</pre>
        </div>
      </div>
    </Page>
  );
};

export default Generator;

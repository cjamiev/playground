import React, { useState } from 'react';
import Page from 'components/layout';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
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
const WIDTH_MAX = 1000;
const HEIGHT_MAX = 1000;

const getBoxStyle = ({
  borderThickness,
  borderValues,
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
  horizontalTextShadow,
  verticalTextShadow,
  blurRadiusTextShadow,
  colorTextShadow,
  width,
  height
}) => {
  const borderStyle = borderValues.find(item => item.selected).label;
  const radiusTopLeft = topLeftRadius ? `${topLeftRadius}px`: '0';
  const radiusTopRight = topRightRadius ? `${topRightRadius}px`: '0';
  const radiusBottomRight = bottomRightRadius ? `${bottomRightRadius}px`: '0';
  const radiusBottomLeft = bottomLeftRadius ? `${bottomLeftRadius}px`: '0';

  return {
    border: `${borderThickness}px ${borderStyle} ${borderColor}`,
    borderRadius: `${radiusTopLeft} ${radiusTopRight} ${radiusBottomRight} ${radiusBottomLeft}`,
    boxShadow: `${horizontalBoxShadow}px ${verticalBoxShadow}px ${blurRadiusBoxShadow}px ${spreadBoxShadow}px ${colorBoxShadow}`,
    backgroundColor,
    opacity: Number(opacity) / OPACITY_MAX,
    color: fontColor,
    fontSize: `${fontSize}px`,
    textShadow: `${horizontalTextShadow}px ${verticalTextShadow}px ${blurRadiusTextShadow}px ${colorTextShadow}`,
    width: `${width}px`,
    height: `${height}px`
  };
};

const getCSSFromJSON = (style) => {
  const parsedCSS = toDashCaseFromCamelCase(JSON.stringify(style))
    .replace('{','{\n  ')
    .replace('}','\n}')
    .replace(/"/g,'')
    .replace(/,/g,';\n  ');

  return parsedCSS;
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
  const [horizontalTextShadow, setHorizontalTextShadow] = useState('0');
  const [verticalTextShadow, setVerticalTextShadow] = useState('0');
  const [blurRadiusTextShadow, setBlurRadiusTextShadow] = useState('0');
  const [colorTextShadow, setColorTextShadow] = useState('#ffffff');
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState('50');

  const handleBorderThicknessChange = ({ target: { value }}) => {
    setBorderThickness(value);
  };

  const handleBorderTypeChange = ({ values }) => {
    setBorderValues(values);
  };

  const handleBorderColorChange = ({ target: { value }}) => {
    setBorderColor(value);
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

  const handleColorBoxShadowChange = ({ target: { value }}) => {
    setColorBoxShadow(value);
  };

  const handleBackgroundColorChange = ({ target: { value }}) => {
    setBackgroundColor(value);
  };

  const handleOpacityChange = ({ target: { value }}) => {
    setOpacity(value);
  };

  const handleFontColorChange = ({ target: { value }}) => {
    setFontColor(value);
  };

  const handleFontSizeChange = ({ target: { value }}) => {
    setFontSize(value);
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

  const handleColorTextShadowChange = ({ target: { value }}) => {
    setColorTextShadow(value);
  };

  const handleWidthChange = ({ target: { value }}) => {
    setWidth(value);
  };

  const handleHeightChange = ({ target: { value }}) => {
    setHeight(value);
  };

  const boxStyle = getBoxStyle({
    borderThickness,
    borderValues,
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
    horizontalTextShadow,
    verticalTextShadow,
    blurRadiusTextShadow,
    colorTextShadow,
    width,
    height
  });
  const generatedCSS = getCSSFromJSON(boxStyle);

  return (
    <Page>
      <div>
        <h2> Border </h2>
        <label>Border Thickness </label><input type="range" min="0" max={THICKNESS_MAX} value={borderThickness} onChange={handleBorderThicknessChange} />
        <Dropdown label="Border Type" values={borderValues} onChange={handleBorderTypeChange} />
        <label>Border Color </label><input type="color" value={borderColor} onChange={handleBorderColorChange} />
      </div>
      <div>
        <h2> Border Radius </h2>
        <Text label='Top Left' selected={topLeftRadius} onChange={handleTopLeftRadiusChange} />
        <Text label='Top Right' selected={topRightRadius} onChange={handleTopRightRadiusChange} />
        <Text label='Bottom Right' selected={bottomRightRadius} onChange={handleBottomRightRadiusChange} />
        <Text label='Bottom Left' selected={bottomLeftRadius} onChange={handleBottomLeftRadiusChange} />
      </div>
      <div>
        <h2> Box Shadow </h2>
        <Text label='Horizontal' selected={horizontalBoxShadow} onChange={handleHorizontalBoxShadowChange} />
        <Text label='Vertical' selected={verticalBoxShadow} onChange={handleVerticalBoxShadowChange} />
        <Text label='Blur Radius' selected={blurRadiusBoxShadow} onChange={handleBlurRadiusBoxShadowChange} />
        <Text label='Spread' selected={spreadBoxShadow} onChange={handleSpreadBoxShadowChange} />
        <label>Color </label><input type="color" value={colorBoxShadow} onChange={handleColorBoxShadowChange} />
      </div>
      <div>
        <h2> Color </h2>
        <label>BG Color </label><input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
        <label> Opacity </label><input type="range" min="0" max={OPACITY_MAX} value={opacity} onChange={handleOpacityChange} />
      </div>
      <div>
        <h2> Text </h2>
        <label> Font Color </label><input type="color" value={fontColor} onChange={handleFontColorChange} />
        <label> Font Size </label><input type="range" min="0" max={FONT_SIZE_MAX} value={fontSize} onChange={handleFontSizeChange} />
        <Text label='Horizontal' selected={horizontalTextShadow} onChange={handleHorizontalTextShadowChange} />
        <Text label='Vertical' selected={verticalTextShadow} onChange={handleVerticalTextShadowChange} />
        <Text label='Blur Radius' selected={blurRadiusTextShadow} onChange={handleBlurRadiusTextShadowChange} />
        <label>Color </label><input type="color" value={colorTextShadow} onChange={handleColorTextShadowChange} />
      </div>
      <div>
        <h2> Size </h2>
        <label> Width </label><input type="range" min="0" max={WIDTH_MAX} value={width} onChange={handleWidthChange} />
        <label> Height </label><input type="range" min="0" max={HEIGHT_MAX} value={height} onChange={handleHeightChange} />
      </div>
      <div className="container--center">
        <div style={boxStyle}> Text </div>
        <Button
          label="Copy"
          classColor="primary"
          onClick={
            () => {
              copyToClipboard(generatedCSS);
            }
          } />
        <pre>{generatedCSS}</pre>
      </div>
    </Page>
  );
};

export default Generator;

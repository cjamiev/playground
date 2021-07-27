import React, { useState } from 'react';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color, { hexToRGB } from 'components/form/Color';
import { AccordionGroup } from 'components/accordion';
import Range from 'components/form/Range';

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

const GeneratorForm = ({ onChange }) => {
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

  const handleBorderThicknessChange = ({ selected }) => {
    setBorderThickness(selected);

    onChange(boxStyle);
  };

  const handleBorderTypeChange = ({ values }) => {
    setBorderValues(values);

    onChange(boxStyle);
  };

  const handleBorderColorChange = ({ selected }) => {
    setBorderColor(selected);

    onChange(boxStyle);
  };

  const handleTopLeftRadiusChange = ({ selected }) => {
    setTopLeftRadius(selected);

    onChange(boxStyle);
  };

  const handleTopRightRadiusChange = ({ selected }) => {
    setTopRightRadius(selected);

    onChange(boxStyle);
  };

  const handleBottomRightRadiusChange = ({ selected }) => {
    setBottomRightRadius(selected);

    onChange(boxStyle);
  };

  const handleBottomLeftRadiusChange = ({ selected }) => {
    setBottomLeftRadius(selected);

    onChange(boxStyle);
  };

  const handleHorizontalBoxShadowChange = ({ selected }) => {
    setHorizontalBoxShadow(selected);

    onChange(boxStyle);
  };

  const handleVerticalBoxShadowChange = ({ selected }) => {
    setVerticalBoxShadow(selected);

    onChange(boxStyle);
  };

  const handleBlurRadiusBoxShadowChange = ({ selected }) => {
    setBlurRadiusBoxShadow(selected);

    onChange(boxStyle);
  };

  const handleSpreadBoxShadowChange = ({ selected }) => {
    setSpreadBoxShadow(selected);

    onChange(boxStyle);
  };

  const handleColorBoxShadowChange = ({ selected }) => {
    setColorBoxShadow(selected);

    onChange(boxStyle);
  };

  const handleBackgroundColorChange = ({ selected }) => {
    setBackgroundColor(selected);

    onChange(boxStyle);
  };

  const handleOpacityChange = ({ selected }) => {
    setOpacity(selected);

    onChange(boxStyle);
  };

  const handleFontColorChange = ({ selected }) => {
    setFontColor(selected);

    onChange(boxStyle);
  };

  const handleFontSizeChange = ({ selected }) => {
    setFontSize(selected);

    onChange(boxStyle);
  };

  const handleTextAlignValuesChange = ({ values }) => {
    setTextAlignValues(values);

    onChange(boxStyle);
  };

  const handleHorizontalTextShadowChange = ({ selected }) => {
    setHorizontalTextShadow(selected);

    onChange(boxStyle);
  };

  const handleVerticalTextShadowChange = ({ selected }) => {
    setVerticalTextShadow(selected);

    onChange(boxStyle);
  };

  const handleBlurRadiusTextShadowChange = ({ selected }) => {
    setBlurRadiusTextShadow(selected);

    onChange(boxStyle);
  };

  const handleColorTextShadowChange = ({ selected }) => {
    setColorTextShadow(selected);

    onChange(boxStyle);
  };

  const handleMarginTopChange = ({ selected }) => {
    setMarginTop(selected);

    onChange(boxStyle);
  };

  const handleMarginRightChange = ({ selected }) => {
    setMarginRight(selected);

    onChange(boxStyle);
  };

  const handleMarginBottomChange = ({ selected }) => {
    setMarginBottom(selected);

    onChange(boxStyle);
  };

  const handleMarginLeftChange = ({ selected }) => {
    setMarginLeft(selected);

    onChange(boxStyle);
  };

  const handlePaddingTopChange = ({ selected }) => {
    setPaddingTop(selected);

    onChange(boxStyle);
  };

  const handlePaddingRightChange = ({ selected }) => {
    setPaddingRight(selected);

    onChange(boxStyle);
  };

  const handlePaddingBottomChange = ({ selected }) => {
    setPaddingBottom(selected);

    onChange(boxStyle);
  };

  const handlePaddingLeftChange = ({ selected }) => {
    setPaddingLeft(selected);

    onChange(boxStyle);
  };

  const handleWidthChange = ({ selected }) => {
    setWidth(selected);

    onChange(boxStyle);
  };

  const handleHeightChange = ({ selected }) => {
    setHeight(selected);

    onChange(boxStyle);
  };

  return (
    <AccordionGroup
      data={[
        { label: 'Border', content:
              (<>
                <Range label="Thickness" min="0" max={THICKNESS_MAX} selected={borderThickness} onChange={handleBorderThicknessChange} />
                <Dropdown label={`Type: ${borderStyle}`} values={borderValues} onChange={handleBorderTypeChange} />
                <Color label="Color" selected={borderColor} onChange={handleBorderColorChange} />
              </>)},
        { label: 'Border Radius', content:
              (<>
                <Text label='Top Left' selected={topLeftRadius} onChange={handleTopLeftRadiusChange} />
                <Text label='Top Right' selected={topRightRadius} onChange={handleTopRightRadiusChange} />
                <Text label='Bottom Right' selected={bottomRightRadius} onChange={handleBottomRightRadiusChange} />
                <Text label='Bottom Left' selected={bottomLeftRadius} onChange={handleBottomLeftRadiusChange} />
              </>)},{ label: 'Box Shadow', content: (
          <>
            <Text label='Horizontal' selected={horizontalBoxShadow} onChange={handleHorizontalBoxShadowChange} />
            <Text label='Vertical' selected={verticalBoxShadow} onChange={handleVerticalBoxShadowChange} />
            <Text label='Blur Radius' selected={blurRadiusBoxShadow} onChange={handleBlurRadiusBoxShadowChange} />
            <Text label='Spread' selected={spreadBoxShadow} onChange={handleSpreadBoxShadowChange} />
            <Color label="Color" selected={colorBoxShadow} onChange={handleColorBoxShadowChange} />
          </>)},
        { label: 'Size', content:
              (<>
                <Range label="Width" min="0" max={WIDTH_MAX} selected={width} onChange={handleWidthChange} />
                <Range label="Height" min="0" max={HEIGHT_MAX} selected={height} onChange={handleHeightChange} />
              </>)},
        { label: 'Color', content:
              (<>
                <Color label="BG Color" selected={backgroundColor} onChange={handleBackgroundColorChange} />
                <Range label="Opacity" min="0" max={OPACITY_MAX} selected={opacity} onChange={handleOpacityChange} />
              </>)},{ label: 'Text', content: (
          <>
            <Color label="Font Color" selected={fontColor} onChange={handleFontColorChange} />
            <Range label="Font Size" min="0" max={FONT_SIZE_MAX} selected={fontSize} onChange={handleFontSizeChange} />
            <Dropdown label={`Text Align: ${textAlign}`} values={textAlignValues} onChange={handleTextAlignValuesChange} />
            <Text label='Horizontal' selected={horizontalTextShadow} onChange={handleHorizontalTextShadowChange} />
            <Text label='Vertical' selected={verticalTextShadow} onChange={handleVerticalTextShadowChange} />
            <Text label='Blur Radius' selected={blurRadiusTextShadow} onChange={handleBlurRadiusTextShadowChange} />
            <Color label="Text Shadow Color" selected={colorTextShadow} onChange={handleColorTextShadowChange} />
          </>)},
        { label: 'Margin', content:
              (<>
                <Text label='Top' selected={marginTop} onChange={handleMarginTopChange} />
                <Text label='Right' selected={marginRight} onChange={handleMarginRightChange} />
                <Text label='Bottom' selected={marginBottom} onChange={handleMarginBottomChange} />
                <Text label='Left' selected={marginLeft} onChange={handleMarginLeftChange} />
              </>)},{ label: 'Padding', content: (
          <>
            <Text label='Top' selected={paddingTop} onChange={handlePaddingTopChange} />
            <Text label='Right' selected={paddingRight} onChange={handlePaddingRightChange} />
            <Text label='Bottom' selected={paddingBottom} onChange={handlePaddingBottomChange} />
            <Text label='Left' selected={paddingLeft} onChange={handlePaddingLeftChange} />
          </>)}]} />
  );
};

export default GeneratorForm;

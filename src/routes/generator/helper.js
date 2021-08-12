import { toDashCaseFromCamelCase } from 'stringHelper';
import {
  OPACITY_MAX
} from 'constants/css';

const ONE = 1;

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

export const getCurrentStyles = ({ normalStyle, hoverStyle, activeStyle, isHoverMode, isHovering, isActiveMode, isActive }) => {
  const inlineNormalStyle = getInlineStyle(normalStyle);
  const inlineHoverStyle = getInlineStyle(hoverStyle);
  const inlineActiveStyle = getInlineStyle(activeStyle);
  const normalCSS = toCssString(inlineNormalStyle);
  const hoverCSS = toCssString(inlineHoverStyle);
  const activeCSS = toCssString(inlineActiveStyle);

  if(isHoverMode) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineHoverStyle},
      currentStyle: hoverStyle,
      normalCSS,
      hoverCSS,
      activeCSS
    };
  } else if(isActiveMode) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineActiveStyle},
      currentStyle: hoverStyle,
      normalCSS,
      hoverCSS,
      activeCSS
    };
  } else if(isHovering && isActive) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineHoverStyle, ...inlineActiveStyle},
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS
    };
  } else if(isHovering) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineHoverStyle},
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS
    };
  } else if(isActive) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineActiveStyle},
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS
    };
  } else {
    return {
      currentInlineStyle: inlineNormalStyle,
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS
    };
  }
};
import { toDashCaseFromCamelCase } from 'stringHelper';
import { filterOutEmptyKeys } from 'objectHelper';
import { hexToRGB } from 'components/form/Color';
import { OPACITY_MAX } from 'constants/css';

const ZERO = 0;
const ONE = 1;

const toCssString = (style) => {
  const cssProperties = Object.keys(style);
  const mergedProperties = cssProperties
    .map((key) => {
      return `${toDashCaseFromCamelCase(key)}: ${style[key]};\n`;
    })
    .join('');

  return mergedProperties.slice(ZERO, -ONE);
};

const getPixelProperties = ({ first, second, third, fourth }) => {
  if (!first || !second || !third || !fourth) {
    return;
  }

  return `${first}px ${second}px ${third}px ${fourth}px`;
};

const getBoxShadowProperty = ({
  horizontalBoxShadow,
  verticalBoxShadow,
  blurRadiusBoxShadow,
  spreadBoxShadow,
  colorBoxShadow
}) => {
  if (!horizontalBoxShadow || !verticalBoxShadow || !blurRadiusBoxShadow || !spreadBoxShadow || !colorBoxShadow) {
    return;
  }

  return `${horizontalBoxShadow}px ${verticalBoxShadow}px ${blurRadiusBoxShadow}px ${spreadBoxShadow}px ${colorBoxShadow}`;
};

const getTextShadowProperty = ({ horizontalTextShadow, verticalTextShadow, blurRadiusTextShadow, colorTextShadow }) => {
  if (!horizontalTextShadow || !verticalTextShadow || !blurRadiusTextShadow || !colorTextShadow) {
    return;
  }

  return `${horizontalTextShadow}px ${verticalTextShadow}px ${blurRadiusTextShadow}px ${colorTextShadow}`;
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

const getTransitionProperty = ({
  transitionProperty,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay
}) => {
  if (!transitionProperty || !transitionDuration || !transitionTimingFunction || !transitionDelay) {
    return;
  }

  return `${transitionProperty} ${transitionDuration}s ${transitionTimingFunction} ${transitionDelay}s`;
};

const getLengthProperty = (length) => {
  if (!length) {
    return;
  }

  return !isNaN(length) ? `${length}px` : length;
};

const getBorderProperty = ({ borderThickness, borderStyle, borderColor }) => {
  if (!borderThickness || !borderStyle || !borderColor) {
    return;
  }

  return `${borderThickness}px ${borderStyle} ${borderColor}`;
};

const getOutlineProperty = ({ outlineThickness, outlineStyle, outlineColor }) => {
  if (!outlineThickness || !outlineStyle || !outlineColor) {
    return;
  }

  return `${outlineThickness}px ${outlineStyle} ${outlineColor}`;
};

const getColorProperty = (color, opacity) => {
  if (!color.red) {
    return;
  } else if (opacity) {
    return `rgba(${color.red},${color.green},${color.blue},${opacity})`;
  } else {
    return `rgba(${color.red},${color.green},${color.blue})`;
  }
};

const getInlineStyle = ({
  borderThickness,
  borderStyle,
  borderColor,
  outlineThickness,
  outlineStyle,
  outlineColor,
  outlineOffset,
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
  backdropBlur,
  backdropBrightness,
  backdropContrast,
  backdropGrayscale,
  backdropHueRotate,
  backdropInvert,
  backdropSaturate,
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
    border: getBorderProperty({ borderThickness, borderStyle, borderColor }),
    borderRadius: getPixelProperties({
      first: topLeftRadius,
      second: topRightRadius,
      third: bottomRightRadius,
      fourth: bottomLeftRadius
    }),
    outline: getOutlineProperty({ outlineThickness, outlineStyle, outlineColor }),
    outlineOffset: outlineOffset && `${outlineOffset}px`,
    boxShadow: getBoxShadowProperty({
      horizontalBoxShadow,
      verticalBoxShadow,
      blurRadiusBoxShadow,
      spreadBoxShadow,
      colorBoxShadow
    }),
    backgroundColor: getColorProperty(rgbColor, normalizedOpacity),
    color: fontColor,
    fontSize: fontSize && `${fontSize}px`,
    textAlign,
    filter: getFilterProperty({
      blur,
      brightness,
      contrast,
      grayscale,
      hueRotate,
      invert,
      saturate
    }),
    backdropFilter: getFilterProperty({
      blur: backdropBlur,
      brightness: backdropBrightness,
      contrast: backdropContrast,
      grayscale: backdropGrayscale,
      hueRotate: backdropHueRotate,
      invert: backdropInvert,
      saturate: backdropSaturate
    }),
    textShadow: getTextShadowProperty({
      horizontalTextShadow,
      verticalTextShadow,
      blurRadiusTextShadow,
      colorTextShadow
    }),
    transform: getTransformProperty({ rotate, translateX, translateY, scaleX, scaleY, skewX, skewY }),
    transition: getTransitionProperty({
      transitionProperty,
      transitionDuration,
      transitionTimingFunction,
      transitionDelay
    }),
    margin: getPixelProperties({ first: marginTop, second: marginRight, third: marginBottom, fourth: marginLeft }),
    padding: getPixelProperties({ first: paddingTop, second: paddingRight, third: paddingBottom, fourth: paddingLeft }),
    width: getLengthProperty(width),
    height: getLengthProperty(height)
  };

  return filterOutEmptyKeys(style);
};

export const getCurrentStyles = ({
  normalStyle,
  hoverStyle,
  activeStyle,
  isHoverMode,
  isHovering,
  isActiveMode,
  isActive
}) => {
  const inlineNormalStyle = getInlineStyle(normalStyle);
  const inlineHoverStyle = getInlineStyle(hoverStyle);
  const inlineActiveStyle = getInlineStyle(activeStyle);
  const normalCSS = toCssString(inlineNormalStyle);
  const hoverCSS = toCssString(inlineHoverStyle);
  const activeCSS = toCssString(inlineActiveStyle);

  if (isHoverMode) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineHoverStyle },
      currentStyle: hoverStyle,
      normalCSS,
      hoverCSS,
      activeCSS,
      ariaLabel: 'Hover Mode effect is on'
    };
  } else if (isActiveMode) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineActiveStyle },
      currentStyle: activeStyle,
      normalCSS,
      hoverCSS,
      activeCSS,
      ariaLabel: 'Active Mode effect is on'
    };
  } else if (isHovering && isActive) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineHoverStyle, ...inlineActiveStyle },
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS,
      ariaLabel: 'isHovering and isActive effect is on'
    };
  } else if (isHovering) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineHoverStyle },
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS,
      ariaLabel: 'isHovering effect is on'
    };
  } else if (isActive) {
    return {
      currentInlineStyle: { ...inlineNormalStyle, ...inlineActiveStyle },
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS,
      ariaLabel: 'isActive effect is on'
    };
  } else {
    return {
      currentInlineStyle: inlineNormalStyle,
      currentStyle: normalStyle,
      normalCSS,
      hoverCSS,
      activeCSS,
      ariaLabel: 'normal effect is on'
    };
  }
};

import { toDashCaseFromCamelCase } from 'stringHelper';
import { filterOutEmptyKeys } from 'objectHelper';
import { hexToRGB } from 'components/form/Color';
import { OPACITY_MAX } from 'constants/css';

const ZERO = 0;
const ONE = 1;
const HUNDRED = 100;

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
  insetBoxShadow,
  horizontalBoxShadow,
  verticalBoxShadow,
  blurRadiusBoxShadow,
  spreadBoxShadow,
  colorBoxShadow
}) => {
  if (!horizontalBoxShadow || !verticalBoxShadow || !blurRadiusBoxShadow || !spreadBoxShadow || !colorBoxShadow) {
    return;
  }
  const inset = insetBoxShadow ? 'inset ': '';

  return `${inset}${horizontalBoxShadow}px ${verticalBoxShadow}px ${blurRadiusBoxShadow}px ${spreadBoxShadow}px ${colorBoxShadow}`;
};

const getTextShadowProperty = ({ horizontalTextShadow, verticalTextShadow, blurRadiusTextShadow, colorTextShadow }) => {
  if (!horizontalTextShadow || !verticalTextShadow || !blurRadiusTextShadow || !colorTextShadow) {
    return;
  }

  return `${horizontalTextShadow}px ${verticalTextShadow}px ${blurRadiusTextShadow}px ${colorTextShadow}`;
};

const getFilterProperty = ({
  blur,
  brightness,
  contrast,
  grayscale,
  hueRotate,
  invert,
  opacity,
  saturate,
  sepia
}) => {
  const filterBlur = blur ? `blur(${blur}px) ` : '';
  const filterBrightness = brightness ? `brightness(${brightness}%) ` : '';
  const filterContrast = contrast ? `contrast(${contrast}%)  ` : '';
  const filterGrayscale = grayscale ? `grayscale(${grayscale}%)  ` : '';
  const filterHueRotate = hueRotate ? `hue-rotate(${hueRotate}deg)  ` : '';
  const filterInvert = invert ? `invert(${invert}%)  ` : '';
  const filterOpacity = opacity ? `opacity(${opacity}%)  ` : '';
  const filterSaturate = saturate ? `saturate(${saturate}%)  ` : '';
  const filterSepia = sepia ? `sepia(${sepia}%)  ` : '';

  return `${filterBlur}${filterBrightness}${filterContrast}${filterGrayscale}${filterHueRotate}${filterInvert}${filterOpacity}${filterSaturate}${filterSepia}`;
};

const getTransformProperty = ({
  rotateX,
  rotateY,
  rotateZ,
  translateX,
  translateY,
  scaleX,
  scaleY,
  skewX,
  skewY
}) => {
  const transformRotateX = rotateX ? `rotateX(${rotateX}deg) ` : '';
  const transformRotateY = rotateY ? `rotateY(${rotateY}deg) ` : '';
  const transformRotateZ = rotateZ ? `rotateZ(${rotateZ}deg) ` : '';
  const transformTranslateX = translateX ? `translateX(${translateX}px) ` : '';
  const transformTranslateY = translateY ? `translateY(${translateY}px) ` : '';
  const transformScaleX = scaleX ? `scaleX(${scaleX/HUNDRED}) ` : '';
  const transformScaleY = scaleY ? `scaleY(${scaleY/HUNDRED}) ` : '';
  const transformSkewX = skewX ? `skewX(${skewX}deg) ` : '';
  const transformSkewY = skewY ? `skewY(${skewY}deg) ` : '';

  return `${transformRotateX}${transformRotateY}${transformRotateZ}${transformTranslateX}${transformTranslateY}${transformScaleX}${transformScaleY}${transformSkewX}${transformSkewY}`;
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
  borderRadius,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  insetBoxShadow,
  horizontalBoxShadow,
  verticalBoxShadow,
  blurRadiusBoxShadow,
  spreadBoxShadow,
  colorBoxShadow,
  secondaryInsetBoxShadow,
  secondaryHorizontalBoxShadow,
  secondaryVerticalBoxShadow,
  secondaryBlurRadiusBoxShadow,
  secondarySpreadBoxShadow,
  secondaryColorBoxShadow,
  backgroundColor,
  backgroundColorOpacity,
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
  filterOpacity,
  saturate,
  sepia,
  backdropBlur,
  backdropBrightness,
  backdropContrast,
  backdropGrayscale,
  backdropHueRotate,
  backdropInvert,
  backdropOpacity,
  backdropSaturate,
  backdropSepia,
  rotateX,
  rotateY,
  rotateZ,
  translateX,
  translateY,
  scaleX,
  scaleY,
  skewX,
  skewY,
  transition,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  width,
  height
}) => {
  const rgbColor = backgroundColor ? hexToRGB(backgroundColor) : {};
  const normalizedOpacity = Number(backgroundColorOpacity) / OPACITY_MAX;
  const firstBoxShadow = getBoxShadowProperty({
    insetBoxShadow,
    horizontalBoxShadow,
    verticalBoxShadow,
    blurRadiusBoxShadow,
    spreadBoxShadow,
    colorBoxShadow
  });
  const secondBoxShadow = getBoxShadowProperty({
    insetBoxShadow: secondaryInsetBoxShadow,
    horizontalBoxShadow: secondaryHorizontalBoxShadow,
    verticalBoxShadow: secondaryVerticalBoxShadow,
    blurRadiusBoxShadow: secondaryBlurRadiusBoxShadow,
    spreadBoxShadow: secondarySpreadBoxShadow,
    colorBoxShadow: secondaryColorBoxShadow
  });

  const style = {
    border: getBorderProperty({ borderThickness, borderStyle, borderColor }),
    borderRadius: borderRadius ? `${borderRadius}px` : getPixelProperties({
      first: topLeftRadius,
      second: topRightRadius,
      third: bottomRightRadius,
      fourth: bottomLeftRadius
    }),
    outline: getOutlineProperty({ outlineThickness, outlineStyle, outlineColor }),
    outlineOffset: outlineOffset && `${outlineOffset}px`,
    boxShadow: firstBoxShadow && secondBoxShadow ? `${firstBoxShadow}, ${secondBoxShadow}`: firstBoxShadow,
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
      opacity: filterOpacity,
      saturate,
      sepia
    }),
    backdropFilter: getFilterProperty({
      blur: backdropBlur,
      brightness: backdropBrightness,
      contrast: backdropContrast,
      grayscale: backdropGrayscale,
      hueRotate: backdropHueRotate,
      opacity: backdropOpacity,
      invert: backdropInvert,
      saturate: backdropSaturate,
      sepia: backdropSepia
    }),
    textShadow: getTextShadowProperty({
      horizontalTextShadow,
      verticalTextShadow,
      blurRadiusTextShadow,
      colorTextShadow
    }),
    transform: getTransformProperty({
      rotateX,
      rotateY,
      rotateZ,
      translateX,
      translateY,
      scaleX,
      scaleY,
      skewX,
      skewY
    }),
    transition,
    margin: margin ? `${margin}px`: getPixelProperties({ first: marginTop, second: marginRight, third: marginBottom, fourth: marginLeft }),
    padding: padding ? `${padding}px`:getPixelProperties({ first: paddingTop, second: paddingRight, third: paddingBottom, fourth: paddingLeft }),
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

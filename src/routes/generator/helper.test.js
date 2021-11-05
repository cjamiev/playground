import { getCurrentStyles } from './helper';

const defaultParams = {
  normalStyle: {
    backgroundColor: '#111111',
    borderThickness: '1',
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '10em',
    height: '50',
    marginTop: '5',
    marginRight: '6',
    marginBottom: '7',
    marginLeft: '8',
    horizontalBoxShadow: '1',
    verticalBoxShadow: '2',
    blurRadiusBoxShadow: '3',
    spreadBoxShadow: '4',
    colorBoxShadow: '#ffffff',
    horizontalTextShadow: '9',
    verticalTextShadow: '10',
    blurRadiusTextShadow: '11',
    colorTextShadow: '#111111',
    transition: 'all 1s linear 3s',
    rotateX: '1',
    rotateY: '2',
    rotateZ: '3',
    translateX: '1',
    translateY: '1',
    scaleX: '200',
    scaleY: '200',
    skewX: '2',
    skewY: '2',
    blur: '0',
    brightness: '50',
    contrast: '50',
    grayscale: '50',
    hueRotate: '50',
    invert: '50',
    saturate: '50',
    fontSize: '14'
  },
  hoverStyle: {
    blur: '5'
  },
  activeStyle: {
    backgroundColor: '#ffffff',
    backgroundColorOpacity: '50',
    blur: undefined
  },
  isHoverMode: false,
  isHovering: false,
  isActiveMode: false,
  isActive: false
};

const parsedNormalStyle = {
  backgroundColor: 'rgba(17,17,17)',
  border: '1px solid #000000',
  height: '50px',
  width: '10em',
  margin: '5px 6px 7px 8px',
  boxShadow: '1px 2px 3px 4px #ffffff',
  transition: 'all 1s linear 3s',
  textShadow: '9px 10px 11px #111111',
  transform: 'rotateX(1deg) rotateY(2deg) rotateZ(3deg) translateX(1px) translateY(1px) scaleX(2) scaleY(2) skewX(2deg) skewY(2deg) ',
  filter: 'blur(0px) brightness(50%) contrast(50%)  grayscale(50%)  hue-rotate(50deg)  invert(50%)  saturate(50%)  ',
  fontSize: '14px'
};
const parsedHoverStyle = {
  filter: 'blur(5px) '
};
const parsedActiveStyle = {
  backgroundColor: 'rgba(255,255,255,0.5)'
};
const parsedNormalCSS =
  'height: 50px;\nwidth: 10em;\nmargin: 5px 6px 7px 8px;\ntransition: all 1s linear 3s;\ntransform: rotateX(1deg) rotateY(2deg) rotateZ(3deg) translateX(1px) translateY(1px) scaleX(2) scaleY(2) skewX(2deg) skewY(2deg) ;\ntext-shadow: 9px 10px 11px #111111;\nfilter: blur(0px) brightness(50%) contrast(50%)  grayscale(50%)  hue-rotate(50deg)  invert(50%)  saturate(50%)  ;\nfont-size: 14px;\nbackground-color: rgba(17,17,17);\nbox-shadow: 1px 2px 3px 4px #ffffff;\nborder: 1px solid #000000;';
const parsedHoverCSS = 'filter: blur(5px) ;';
const parsedActiveCSS = 'background-color: rgba(255,255,255,0.5);';

describe('helper (generator)', () => {
  it('getCurrentStyles - isHoverMode', () => {
    const { currentInlineStyle, currentStyle, normalCSS, hoverCSS, activeCSS } = getCurrentStyles({
      ...defaultParams,
      isHoverMode: true
    });

    expect(currentInlineStyle).toEqual({
      ...parsedNormalStyle,
      ...parsedHoverStyle
    });
    expect(currentStyle).toEqual(defaultParams.hoverStyle);
    expect(normalCSS).toEqual(parsedNormalCSS);
    expect(hoverCSS).toEqual(parsedHoverCSS);
    expect(activeCSS).toEqual(parsedActiveCSS);
  });

  it('getCurrentStyles - isActiveMode', () => {
    const { currentInlineStyle, currentStyle, normalCSS, hoverCSS, activeCSS } = getCurrentStyles({
      ...defaultParams,
      isActiveMode: true
    });

    expect(currentInlineStyle).toEqual({
      ...parsedNormalStyle,
      ...parsedActiveStyle
    });
    expect(currentStyle).toEqual(defaultParams.activeStyle);
    expect(normalCSS).toEqual(parsedNormalCSS);
    expect(hoverCSS).toEqual(parsedHoverCSS);
    expect(activeCSS).toEqual(parsedActiveCSS);
  });

  it('getCurrentStyles - isHovering and isActive', () => {
    const { currentInlineStyle, currentStyle, normalCSS, hoverCSS, activeCSS } = getCurrentStyles({
      ...defaultParams,
      isHovering: true,
      isActive: true
    });

    expect(currentInlineStyle).toEqual({
      ...parsedNormalStyle,
      ...parsedActiveStyle,
      ...parsedHoverStyle
    });
    expect(currentStyle).toEqual(defaultParams.normalStyle);
    expect(normalCSS).toEqual(parsedNormalCSS);
    expect(hoverCSS).toEqual(parsedHoverCSS);
    expect(activeCSS).toEqual(parsedActiveCSS);
  });

  it('getCurrentStyles - isHovering', () => {
    const { currentInlineStyle, currentStyle, normalCSS, hoverCSS, activeCSS } = getCurrentStyles({
      ...defaultParams,
      isHovering: true
    });

    expect(currentInlineStyle).toEqual({
      ...parsedNormalStyle,
      ...parsedHoverStyle
    });
    expect(currentStyle).toEqual(defaultParams.normalStyle);
    expect(normalCSS).toEqual(parsedNormalCSS);
    expect(hoverCSS).toEqual(parsedHoverCSS);
    expect(activeCSS).toEqual(parsedActiveCSS);
  });

  it('getCurrentStyles - isActive', () => {
    const { currentInlineStyle, currentStyle, normalCSS, hoverCSS, activeCSS } = getCurrentStyles({
      ...defaultParams,
      isActive: true
    });

    expect(currentInlineStyle).toEqual({
      ...parsedNormalStyle,
      ...parsedActiveStyle
    });
    expect(currentStyle).toEqual(defaultParams.normalStyle);
    expect(normalCSS).toEqual(parsedNormalCSS);
    expect(hoverCSS).toEqual(parsedHoverCSS);
    expect(activeCSS).toEqual(parsedActiveCSS);
  });

  it('getCurrentStyles - normal mode', () => {
    const { currentInlineStyle, currentStyle, normalCSS, hoverCSS, activeCSS } = getCurrentStyles(defaultParams);

    expect(currentInlineStyle).toEqual(parsedNormalStyle);
    expect(currentStyle).toEqual(defaultParams.normalStyle);
    expect(normalCSS).toEqual(parsedNormalCSS);
    expect(hoverCSS).toEqual(parsedHoverCSS);
    expect(activeCSS).toEqual(parsedActiveCSS);
  });
});

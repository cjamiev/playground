const ColorMap = {
  'RED' : 'mk-red',
  'ORANGE' : 'mk-orange',
  'YELLOW' : 'mk-yellow',
  'GREEN' : 'mk-green',
  'BLUE' : 'mk-blue',
  'DARK_BLUE' : 'mk-dkblue',
  'PURPLE' : 'mk-purple',
  'WHITE' : 'mk-white',
}
const ColorSequence = [ColorMap.YELLOW, ColorMap.PURPLE, ColorMap.BLUE]; 

const getWrappedContent = (segment) => {
  if(segment === "'" || segment === "''") {
    return `{"${segment}"}`
  }
  return `{'${segment}'}`
}

const getDivElement = (line) => {
  return `<div className='line'>\n${line}\n</div>`
}

const getSpanElement = ({ colorName, indentCount, segment, shouldWrap = false, addSpace = true }) => {
  const indentClassName = indentCount ? ` indent-${indentCount}` : '';
  const className = colorName + indentClassName;
  const wrappedSegment = shouldWrap ? getWrappedContent(segment) : segment;
  const extraSpace = addSpace ? ' ' : '';

  return `<span className='${className}'>${wrappedSegment}${extraSpace}</span>`
}

const getOpenBrace = ({ indentCount = 0, blockTracker }) => {
  const currentColorIndex = blockTracker.length;
  const colorName = ColorSequence[currentColorIndex > 2 ? currentColorIndex % 3 : currentColorIndex];
  blockTracker.push(colorName);
  
  return getSpanElement( { colorName, indentCount, segment: '{', shouldWrap: true, addSpace: false });
}

const getCloseBrace = ({ indentCount = 0, blockTracker }) => {
  const colorName = blockTracker.pop();
  
  return getSpanElement( { colorName, indentCount, segment: '}', shouldWrap: true, addSpace: false });
}

const getOpenParenthesis = ({ indentCount = 0, blockTracker }) => {
  const currentColorIndex = blockTracker.length;
  const colorName = ColorSequence[currentColorIndex > 2 ? currentColorIndex % 3 : currentColorIndex];
  blockTracker.push(colorName);
  
  return getSpanElement( { colorName, indentCount, segment: '(', shouldWrap: true, addSpace: false });
}

const getCloseParenthesis = ({ indentCount = 0, blockTracker }) => {
  const colorName = blockTracker.pop();
  
  return getSpanElement( { colorName, indentCount, segment: ')', shouldWrap: true, addSpace: false });
}

const getOpenBracket = ({ indentCount = 0, blockTracker }) => {
  const currentColorIndex = blockTracker.length;
  const colorName = ColorSequence[currentColorIndex > 2 ? currentColorIndex % 3 : currentColorIndex];
  blockTracker.push(colorName);
  
  return getSpanElement( { colorName, indentCount, segment: '[', shouldWrap: true, addSpace: false });
}

const getCloseBracket = ({ indentCount = 0, blockTracker }) => {
  const colorName = blockTracker.pop();

  return getSpanElement( { colorName, indentCount, segment: ']', shouldWrap: true, addSpace: false });
}

const getComma = () => {
  return getSpanElement( { colorName: ColorMap.WHITE, segment: ',' });
}

const getPeriod = () => {
  return getSpanElement( { colorName: ColorMap.WHITE, segment: '.' });
}

const getSemicolon = () => {
  return getSpanElement( { colorName: ColorMap.WHITE, segment: ';' });
}

const getColon = () => {
  return getSpanElement( { colorName: ColorMap.WHITE, segment: ':' });
}

const getLessThan = (indentCount = 0) => {
  return getSpanElement( { colorName: ColorMap.WHITE, indentCount, segment: '<', shouldWrap: true, addSpace: false });
}

const getCloseTag = (indentCount = 0) => {
  return getSpanElement( { colorName: ColorMap.WHITE, indentCount, segment: '</', shouldWrap: true, addSpace: false });
}

const getGreaterThan = (indentCount = 0) => {
  return getSpanElement( { colorName: ColorMap.WHITE, indentCount, segment: '>', shouldWrap: true, addSpace: false });
}

const getEqual = () => {
  return getSpanElement({ colorName: ColorMap.RED, segment: " =", shouldWrap: true });
}

const getArrow = () => {
  return getSpanElement({ colorName: ColorMap.BLUE, segment: "=>", shouldWrap: true });
}

const getSingleQuote = (indentCount) => {
  return getSpanElement({ colorName: ColorMap.YELLOW, indentCount, segment: "'", shouldWrap: true });
}

module.exports = {
  ColorMap,
  getDivElement,
  getSpanElement,
  getOpenBrace,
  getCloseBrace,
  getOpenParenthesis,
  getCloseParenthesis,
  getOpenBracket,
  getCloseBracket,
  getComma,
  getPeriod,
  getSemicolon,
  getColon,
  getLessThan,
  getCloseTag,
  getGreaterThan,
  getEqual,
  getArrow,
  getSingleQuote
}
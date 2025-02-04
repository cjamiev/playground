/*
* The purpose of this file is to generate JSX that allows React Code to be displayable in the UI
* with some level of color coding. This script is not perfect but should reduce 90% of the manual labor.
*/
const fs = require('fs');
const templates = require('./templates');
const {
  ColorMap,
  getSpanElement,
  getOpenBrace,
  getCloseBrace,
  getOpenParenthesis,
  getCloseParenthesis,
  getOpenBracket,
  getCloseBracket,
  getLessThan,
  getCloseTag,
  getGreaterThan,
  getArrow,
} = require('./helper');
const { parseCode } = require('./parser');

const currentTranslationTest = templates.currentTranslationTest;

const mapBlockToFunction = {
  '{': getOpenBrace, 
  '}': getCloseBrace, 
  '[': getOpenBracket, 
  ']': getCloseBracket, 
  '(': getOpenParenthesis, 
  ')': getCloseParenthesis
};

const JS_KEYWORDS = ['=', '!', '+', '-', '%', '/', '?', '&', '|', 'if', 'else', 'return', 'switch', 'for', 'case', 'default', 'export', 'import', 'from'];
const blockSymbols = ['{', '}', '[', ']', '(', ')'];
const newLine = '\n';
const JS_VARS = ['let', 'const', 'function'];
const standardFunctions = ['useState','useReducer', 'useContext', 'createContext', 'useEffect', 'dispatch', 'then', 'map', 'concat', 'filter','reduce', 'setTimeout', 'clearTimeout'];

const blockTracker = []; // Keep track of color code for {}, [], () as they alternate with the ColorSequence
let indentCount= 0;

const getColor = (entry) => {
  if(entry.isTag) {
    return ColorMap.RED;
  }
  if(entry.isCustomTag) {
    return ColorMap.BLUE;
  }
  if(entry.isAttribute) {
    return ColorMap.GREEN;
  }
  if(entry.isValue) {
    return ColorMap.PURPLE;
  }
  if(entry.isStringLiteral) {
    return ColorMap.YELLOW;
  }
  return ColorMap.WHITE;
}

const generateJSXFromSegments = (input) => {
  const htmlPieces = input.map((entry, index) => {
    if(newLine === entry.segment) {
      const isFirstDiv = index === 0;
      indentCount = isFirstDiv ? 0 : 1;
      // skip adding closing tag on the first line as its not needed, and skip adding new line on last line
      const jsxElement = `${isFirstDiv ? '' : '</div>'}${index === input.length - 1 ? '' : '<div className="line">'}`;

      return jsxElement;
    }
    if(JS_KEYWORDS.find(item => item === entry.segment)) {
      const jsxElement = getSpanElement( { colorName: ColorMap.RED, indentCount, segment: entry.segment });
      indentCount = 0;

      return jsxElement;
    }
    if(standardFunctions.find(item => item === entry.segment)) {
      const jsxElement = getSpanElement( { colorName: ColorMap.GREEN, indentCount, segment: entry.segment });
      indentCount = 0;

      return jsxElement;
    }
    if(JS_VARS.find(item => item === entry.segment)) {
      const jsxElement = getSpanElement( { colorName: ColorMap.BLUE, indentCount, segment: entry.segment });
      indentCount = 0;
      
      return jsxElement;
    }
    if(blockSymbols.find(item => item === entry.segment)) {
      const getBlockSymbol = mapBlockToFunction[entry.segment];
      const jsxElement = getBlockSymbol({ indentCount, blockTracker });
      indentCount = 0;
      
      return jsxElement;
    }
    if('=>' === entry.segment) {
      const jsxElement = getArrow();
      indentCount = 0;
      
      return jsxElement;
    }
    if('>' === entry.segment) {
      const jsxElement = getGreaterThan();
      indentCount = 0;
      
      return jsxElement;
    }
    if('</' === entry.segment) {
      const jsxElement = getCloseTag(indentCount);
      indentCount = 0;
      
      return jsxElement;
    }
    if('<' === entry.segment) {
      const jsxElement = getLessThan(indentCount);
      indentCount = 0;
      
      return jsxElement;
    }
    else {
      const colorName = getColor(entry);

      const jsxElement = getSpanElement({ colorName, indentCount, segment: entry.segment, });
      indentCount = 0;

      return jsxElement;
    }
  }).join('\n');

  return `<>\n${htmlPieces}\n</>`
}


const segments = parseCode(currentTranslationTest.replaceAll('.', ' . '));
const jsxResult = generateJSXFromSegments(segments);

// allows me to see issues
fs.writeFileSync('./tmp/out.json', JSON.stringify(segments, undefined, 2));
// actual jsx code generated
fs.writeFileSync('./tmp/out.html', jsxResult);
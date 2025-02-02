/*
* The purpose of this file is to generate JSX that allows React Code to be displayable in the UI
* with some level of color coding. This script is not perfect but should reduce 90% of the manual labor.
*/
const fs = require('fs');
const templates = require('./templates');
const {
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
} = require('./helper');

const currentTranslationTest = templates.currentTranslationTest;

const bracketWord = /\[\w+\,/; // [word,
const endBracketWord = /\w+\]/; // word]
const namedFuncStart = /\w+\(\w+/; // word(word
const namedFuncStart2 = /\w+\(\w+\,/; // word(word,
const namedFuncStart3 = /\w+\(\{/; // word({
const namedFuncComplete = /\w+\(\w+\)\;/; // word(word);
const funcComplete = /\(\w+\)/; // (word)
const funcEmpty = /\w+\(\'\'\)\;/; // word('');
const methodEmpty = /\.\w+\(\(\)/ // .func(()
const method = /\.\w+\(\w+/ // .func(var
const method2 = /\.\w+\(\(\w+\,/ // .func((var,

const stringValue = /\'.+\'\,/ // 'word',
const stringValue2 = /\'.+\'\:/ // 'word':
const stringValue3 = /\'.+\'\;/ // 'word';
const propValue = /\{\w+\}/ // {word}
const numberValue = /\d+\,/ // number,
const numberValue2 = /\d+\;/ // number;

const startingTag = /\<\w+/; // <tag
const startingTagComplete = /\<\w+\>/; // <tag>
const endingTag = /\<\/\w+\.*\w*\>/ // </tag> or </customtag.word>
const simpleAttribute = /\w+\=\'\w+\'/ // attribute='value'
const simpleAttributeSplitStart = /\w+\=\'\w+/ // attribute='value
const simpleAttributeSplitEnd = /\w+\'/ // value'
const varAttribute = /\w+\=\{\w+\}/ // attribute={value}
const varAttributeEnd = /\w+\=\{\w+\.*\w+\}\>/ // attribute={value}> or attribute={obj.value}> 
const startingFuncAttribute = /\w+\=\{\(\w*\)/ // attribute={(value) or attribute={(value) 
const endingFuncAttribute = /\w+\(\w+\.*\w*\)\}\>/ // attribute(value)}> or attribute(obj.id)}> 
const emptyTag = /\<\>/ // <>
const closingTag = /\/\>/ // />
const emptyClosingTag = /\<\/\>/ // </>

const JS_KEYWORDS = ['=', '===', '!==', '+', '?', ':', 'if', 'else', 'return', 'switch', 'for', 'case', 'default', 'export', 'import', 'from'];
const JS_VARS = ['let', 'const'];

const blockTracker = []; // Keep track of color code for {}, [], () as they alternate with the ColorSequence
const shouldWrap = true;
const addSpace = false;

const translateLineToHTML = (line) => {
  const segments = line.split(' ').filter(Boolean);
  return segments.map((seg, index) => {
    const indentCount = index === 0 ? 1 : 0;
    if(JS_KEYWORDS.find(item => item === seg)) {
      return getSpanElement( { colorName: ColorMap.RED, indentCount, segment: seg });
    }
    if(JS_VARS.find(item => item === seg)) {
      return getSpanElement( { colorName: ColorMap.BLUE, indentCount, segment: seg });
    }
    if('(' === seg) {
      return getOpenParenthesis({ indentCount, blockTracker });
    }
    if(')' === seg) {
      return getCloseParenthesis({ indentCount, blockTracker });
    }
    if('{' === seg) {
      return getOpenBrace({ indentCount, blockTracker });
    }
    if('}' === seg) {
      return getCloseBrace({ indentCount, blockTracker });
    }
    if('[' === seg) {
      return getOpenBracket({ indentCount, blockTracker });
    }
    if(']' === seg) {
      return getCloseBracket({ indentCount, blockTracker });
    }
    if('=>' === seg) {
      return getArrow();
    }
    if('>' === seg) {
      return getGreaterThan();
    }
    if(bracketWord.test(seg)) {
      const word = seg.replace('[','').replace(',','');
      return getOpenBracket({ indentCount, blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: word }) + '\n' + getComma();
    }
    if(endBracketWord.test(seg)) {
      const word = seg.replace(']','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: word }) + '\n' + getCloseBracket({ blockTracker });
    }
    if(namedFuncComplete.test(seg)) {
      const words = seg.replace(')','').replace(';','').split('(',);
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: words[1] }) + '\n' + getCloseParenthesis({ blockTracker }) + '\n' + getSemicolon();
    }
    if(namedFuncStart3.test(seg)) {
      const word = seg.replace('(','').replace('{','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: word, }) + '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getOpenBrace({ blockTracker });
    }
    if(namedFuncStart2.test(seg)) {
      const words = seg.split('(');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: words[0] }) + '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: words[1].replace(',','') }) + '\n' + getComma();
    }
    if(namedFuncStart.test(seg)) {
      const words = seg.split('(');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: words[0] }) + '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: words[1] });
    }
    if(funcComplete.test(seg) && !startingFuncAttribute.test(seg)) {
      const word = seg.replace('(','').replace(')','');
      return getOpenParenthesis({ indentCount, blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: word }) + '\n' + getCloseParenthesis({ blockTracker });
    }
    if(funcEmpty.test(seg)) {
      const word = seg.replace("('');",'');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: word, }) + '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: "''", shouldWrap }) + '\n' + getCloseParenthesis({ blockTracker }) + '\n' + getSemicolon();
    }
    if(methodEmpty.test(seg)) {
      const word = seg.replace('.','').replace('(()','');
      return getPeriod() + '\n' + getSpanElement({ colorName: ColorMap.GREEN, segment: word }) + '\n' + getOpenParenthesis({ blockTracker })+ '\n' + getOpenParenthesis({ blockTracker }) + getCloseParenthesis({ blockTracker });
    }
    if(method.test(seg)) {
      const words = seg.replace('.','').split('(');
      return getPeriod() + '\n' + getSpanElement({ colorName: ColorMap.GREEN, segment: words[0] }) + '\n' + getOpenParenthesis({ blockTracker })+ '\n' + getSpanElement({ colorName: ColorMap.ORANGE, segment: words[1] });
    }
    if(method2.test(seg)) {
      const words = seg.replace('.','').split('((');
      return getPeriod() + '\n' + getSpanElement({ colorName: ColorMap.GREEN, segment: words[0] }) + '\n' + getOpenParenthesis({ blockTracker })+ '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.ORANGE, segment: words[1].replace(',','') }) + '\n' + getSingleQuote() + '\n' + getComma();
    }
    if(startingTagComplete.test(seg)) {
      const word = seg.replace('<','').replace('>','');
      return getLessThan(indentCount) + '\n' + getSpanElement({ colorName: ColorMap.RED, segment: word, addSpace: false }) + '\n' + getGreaterThan();
    }
    if(startingTag.test(seg)) {
      const word = seg.replace('<','');
      return getLessThan(indentCount) + '\n' + getSpanElement({ colorName: ColorMap.RED, segment: word });
    }
    if(endingTag.test(seg)) {
      const word = seg.replace('</','').replace('>','');
      return getCloseTag(indentCount) + '\n' + getSpanElement({ colorName: ColorMap.RED, segment: word, addSpace: false }) + '\n' + getGreaterThan();
    }
    if(simpleAttribute.test(seg)) {
      const words = seg.split("='");
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getEqual() + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: "'", shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: words[1].replace("'",'')}) + '\n' + getSingleQuote() + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: "'", shouldWrap }) ;
    }
    if(simpleAttributeSplitStart.test(seg)) {
      const words = seg.split("='");
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getEqual() + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: "'", shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: words[1] });
    }
    if(stringValue3.test(seg)) {
      const word = seg.replace("'",'').replace("'",'').replace(";",'');
      return getSingleQuote(indentCount) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: word }) + '\n' + getSingleQuote() + '\n' + getSemicolon();
    }
    if(stringValue2.test(seg)) {
      const word = seg.replace("'",'').replace("'",'').replace(":",'');
      return getSingleQuote(indentCount) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: word }) + '\n' + getSingleQuote() + '\n' + getColon();
    }
    if(stringValue.test(seg)) {
      const word = seg.replace("'",'').replace("'",'');
      return getSingleQuote(indentCount) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: word }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: "'", shouldWrap });
    }
    if(simpleAttributeSplitEnd.test(seg)) {
      const word = seg.replace("'",'');
      return getSpanElement({ colorName: ColorMap.YELLOW, indentCount, segment: word }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: "'", shouldWrap });
    }
    if(varAttributeEnd.test(seg)) {
      const words = seg.split('={');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getEqual() + '\n' + getOpenBrace({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: words[1].replace('}>','')}) + '\n' + getOpenBracket({ blockTracker }) + '\n' + getGreaterThan();
    }
    if(varAttribute.test(seg)) {
      const words = seg.split('={');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getEqual() + '\n' + getOpenBrace({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: words[1].replace('}','')}) + '\n' + getCloseParenthesis({ blockTracker });
    }
    if(startingFuncAttribute.test(seg)) {
      const words = seg.split('={(');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getEqual() + '\n' + getOpenBrace({ blockTracker }) + '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.ORANGE, segment: words[1].replace(')','')}) + '\n' + getCloseParenthesis({ blockTracker });
    }
    if(endingFuncAttribute.test(seg)) {
      const words = seg.split('(');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getOpenParenthesis({ blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.ORANGE, segment: words[1].replace(')}>') }) + '\n' + getCloseParenthesis({ blockTracker }) + '\n' + getCloseBrace({ blockTracker }) + '\n' + getGreaterThan();
    }
    if(emptyTag.test(seg) || emptyClosingTag.test(seg) || closingTag.test(seg)) {
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: seg, shouldWrap });
    }
    if(propValue.test(seg)) {
      const word = seg.replace('{','').replace('}','');
      return getCloseBrace({ indentCount, blockTracker }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: word }) + '\n' + getCloseBrace({ blockTracker });
    }
    if(numberValue.test(seg)) {
      const word = seg.replace(',','');
      return getSpanElement({ colorName: ColorMap.PURPLE, indentCount, segment: word, addSpace }) + '\n' + getComma();
    }
    if(numberValue2.test(seg)) {
      const word = seg.replace(';','');
      return getSpanElement({ colorName: ColorMap.PURPLE, indentCount, segment: word, addSpace }) + '\n' + getSemicolon();
    }
    else {
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: seg, });
    }
  }).join('\n');
};

const translateCodeToHTML = (input) => {
  const htmlPieces = input
    .replaceAll('(', ' ( ')
    .replaceAll(')', ' ) ')
    .replaceAll('{', ' { ')
    .replaceAll('}', ' } ')
    .replaceAll('[', ' [ ')
    .replaceAll(']', ' ] ')
    .split('\n').map(line => {
    if(line.trim() === '') {
      return "<div className='line' />";
    } else {
      return getDivElement(translateLineToHTML(line));
    }
  }).join('\n');

  return `<>\n${htmlPieces}\n</>`
}

fs.writeFileSync('./tmp/out.html', translateCodeToHTML(currentTranslationTest));
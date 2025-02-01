/*
* The purpose of this file is to generate JSX that allows React Code to be displayable in the UI
* with some level of color coding. This script is not perfect but should reduce 90% of the manual labor.
*/
const fs = require('fs');
const templates = require('./templates');

const currentTranslationTest = templates.currentTranslationTest;

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
const startingTagComplete = /\<\w+\>/; // <tag
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

const JS_KEYWORDS = ['=', '===', '!==', ' + ', ' ? ', ' : ', 'if', 'else', 'return', 'switch', 'for', 'case', 'default', 'export', 'import', 'from'];
const JS_VARS = ['let', 'const'];
const BLANKS = "<span className='mk-white'></span>";
const BLANKS2 = "<span className='mk-white'> </span>";
const JS_SYMBOLS = ['{', '}', '[', ']', '(', ')'];
const getDivElement = (line) => {
  return `<div className='line'>\n${line}\n</div>`
} 

const getSpanElement = ({ colorName, indentCount, segment, shouldWrap = false, addSpace = true }) => {
  const indentClassName = indentCount ? ` indent-${indentCount}` : '';
  const className = colorName + indentClassName;
  const wrappedSegment = shouldWrap ? `{'${segment}'}`: segment;
  const extraSpace = addSpace ? ' ' : '';

  return `<span className='${className}'>${wrappedSegment}${extraSpace}</span>`
}

const translateLineToHTML = (line) => {
  const segments = line.split(' ');
  const shouldWrap = true;
  const addSpace = false;
  return segments.map((seg, index) => {
    const indentClass = index === 0 ? ' indent-1': '';
    const indentCount = index === 0 ? 1 : 0;
    if(JS_KEYWORDS.find(item => item === seg)) {
      return getSpanElement( { colorName: ColorMap.RED, indentCount, segment: seg });
    }
    if(JS_VARS.find(item => item === seg)) {
      return getSpanElement( { colorName: ColorMap.BLUE, indentCount, segment: seg });
    }
    if(JS_SYMBOLS.find(item => item === seg)) {
      return getSpanElement( { colorName: ColorMap.DARK_BLUE, indentCount, segment: seg, shouldWrap });
    }
    if('},' === seg) {
      return getSpanElement( { colorName: ColorMap.DARK_BLUE, indentCount, segment: '}', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.WHITE, segment: ',' });
    }
    if('};' === seg) {
      return getSpanElement( { colorName: ColorMap.DARK_BLUE, indentCount, segment: '}', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.WHITE, segment: ';' });
    }
    if('),' === seg) {
      return getSpanElement( { colorName: ColorMap.PURPLE, indentCount, segment: ')', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.WHITE, segment: ',' });
    }
    if(');' === seg) {
      return getSpanElement( { colorName: ColorMap.PURPLE, indentCount, segment: ')', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.WHITE, segment: ';' });
    }
    if('},' === seg) {
      return getSpanElement( { colorName: ColorMap.YELLOW, indentCount, segment: '}', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.WHITE, segment: ',' });
    }
    if('}}' === seg) {
      return getSpanElement( { colorName: ColorMap.YELLOW, indentCount, segment: '}', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.BLUE, segment: '}', shouldWrap });
    }
    if('})}' === seg) {
      return getSpanElement( { colorName: ColorMap.YELLOW, indentCount, segment: '}', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.PURPLE, segment: ')', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.BLUE, segment: '}', shouldWrap });
    }
    if('({' === seg) {
      return getSpanElement( { colorName: ColorMap.PURPLE, indentCount, segment: '(', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.YELLOW, segment: '{', shouldWrap });
    }
    if('})' === seg) {
      return getSpanElement( { colorName: ColorMap.PURPLE, indentCount, segment: '}', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.YELLOW, segment: ')', shouldWrap });
    }
    if('});' === seg) {
      return getSpanElement( { colorName: ColorMap.PURPLE, indentCount, segment: '}', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.YELLOW, segment: ')', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: ';' });
    }
    if('()' === seg) {
      return getSpanElement( { colorName: ColorMap.DARK_BLUE, indentCount, segment: '()', shouldWrap });
    }
    if('=>' === seg) {
      return getSpanElement( { colorName: ColorMap.BLUE, indentCount, segment: '=>', shouldWrap });
    }
    if('([])' === seg) {
      return getSpanElement( { colorName: ColorMap.BLUE, indentCount, segment: '(', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.BLUE, segment: '[]'}) + '\n' + getSpanElement( { colorName: ColorMap.BLUE, segment: ')' });
    }
    if('[])' === seg) {
      return getSpanElement( { colorName: ColorMap.BLUE, segment: '[]', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.BLUE, segment: ')'});
    }
    if('[]);' === seg) {
      return getSpanElement( { colorName: ColorMap.BLUE, indentCount, segment: '[]', shouldWrap }) + '\n' + getSpanElement( { colorName: ColorMap.BLUE, segment: ')'}) + '\n' + getSpanElement( { colorName: ColorMap.WHITE, segment: ';'});
    }
    if(bracketWord.test(seg)) {
      const word = seg.replace('[','').replace(',','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '[', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: word }) + '\n' + getSpanElement({ className: ColorMap.WHITE, segment: ',', shouldWrap });
    }
    if(endBracketWord.test(seg)) {
      const word = seg.replace(']','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: word }) + '\n' + getSpanElement({ className: ColorMap.WHITE, segment: ']', shouldWrap });
    }
    if(namedFuncComplete.test(seg)) {
      const words = seg.replace(')','').replace(';','').split('(',);
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + getSpanElement({ className: ColorMap.PURPLE, segment: '(', shouldWrap }) + `<span className='mk-white'>${words[1]}</span>\n<span className='mk-purple'>{')'}</span>\n<span className='mk-white'>{';'}</span>`;
    }
    if(namedFuncStart3.test(seg)) {
      const word = seg.replace('(','').replace('{','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: word, }) + '\n' + + getSpanElement({ className: ColorMap.PURPLE, segment: '(', shouldWrap }) + `<span className='mk-dkblue'>{'{'}</span>`;
    }
    if(namedFuncStart2.test(seg)) {
      const word = seg.replace('(','').replace('{','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: word, }) + '\n' + + getSpanElement({ className: ColorMap.PURPLE, segment: '(', shouldWrap }) + `<span className='mk-dkblue'>{'{'}</span>`;
    }
    if(namedFuncStart.test(seg)) {
      const word = seg.replace('(','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '(', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.GREEN, segment: word });
    }
    if(funcComplete.test(seg) && !startingFuncAttribute.test(seg)) {
      const word = seg.replace('(','').replace(')','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '(', }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: word }) + '\n' + `<span className='mk-white'>{')'}</span>`;
    }
    if(funcEmpty.test(seg)) {
      const word = seg.replace("('');",'');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: word, }) + '\n' + `<span className='mk-white'>{"('');"}</span>`;
    }
    if(methodEmpty.test(seg)) {
      const word = seg.replace('.','').replace('(()','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '.', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.GREEN, segment: word }) + '\n' + `<span className='mk-blue'>{'('}</span>\n<span className='mk-yellow'>{'()'}</span>`;
    }
    if(method.test(seg)) {
      const words = seg.replace('.','').split('(');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '.', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.GREEN, segment: words[0] }) + '\n' + `<span className='mk-blue'>{'('}</span>\n<span className='mk-orange'>${words[1]}</span>`;
    }
    if(method2.test(seg)) {
      const words = seg.replace('.','').split('((');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '.', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.GREEN, segment: words[0] }) + '\n' + `<span className='mk-blue'>{'('}</span>\n<span className='mk-yellow'>{'('}</span>\n<span className='mk-orange'>${words[1].replace(',','')}</span>\n<span className='mk-white'>{','}</span>`;
    }
    if(startingTagComplete.test(seg)) {
      const word = seg.replace('<','').replace('>','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '<', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.RED, segment: word }) + '\n' + `<span className='mk-white'>{'>'}</span>`;
    }
    if(startingTag.test(seg)) {
      const word = seg.replace('<','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '<', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.RED, segment: word });
    }
    if(endingTag.test(seg)) {
      const word = seg.replace('</','').replace('>','');
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: '</', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.RED, segment: word }) + '\n' + `<span className='mk-white'>{'>'}</span>`;
    }
    if(simpleAttribute.test(seg)) {
      const words = seg.split("='");
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + `<span className='mk-red'>{'='}</span>\n<span className='mk-white'>{"'"}</span>\n<span className='mk-yellow'>${words[1].replace("'",'')}</span>\n<span className='mk-white'>{"'"}</span>`;
    }
    if(simpleAttributeSplitStart.test(seg)) {
      const words = seg.split("='");
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + `<span className='mk-red'>{'='}</span>\n<span className='mk-white'>{"'"}</span>\n<span className='mk-yellow'>${words[1]}</span>`;
    }
    if(stringValue3.test(seg)) {
      const word = seg.replace("'",'').replace("'",'').replace(";",'');
      return getSpanElement({ colorName: ColorMap.YELLOW, indentCount, segment: "'", shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: word }) + '\n' + `<span className='mk-yellow'>{"'"}</span>\n<span className='mk-white'>{';'}</span>`;
    }
    if(stringValue2.test(seg)) {
      const word = seg.replace("'",'').replace("'",'').replace(":",'');
      return getSpanElement({ colorName: ColorMap.YELLOW, indentCount, segment: "'", shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: word }) + '\n' + `<span className='mk-yellow'>{"'"}</span>\n<span className='mk-white'>{':'}</span>`;
    }
    if(stringValue.test(seg)) {
      const word = seg.replace("'",'').replace("'",'');
      return getSpanElement({ colorName: ColorMap.YELLOW, indentCount, segment: "'", shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.YELLOW, segment: word }) + '\n' + `<span className='mk-yellow'>{"'"}</span>`;
    }
    if(simpleAttributeSplitEnd.test(seg)) {
      const word = seg.replace("'",'');
      return getSpanElement({ colorName: ColorMap.YELLOW, indentCount, segment: word }) + '\n' + `<span className='mk-red'>{"'"}</span>`;
    }
    if(varAttributeEnd.test(seg)) {
      const words = seg.split('={');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + `<span className='mk-red'>{'='}</span>\n<span className='mk-dkblue'>{'{'}</span>\n<span className='mk-white'>${words[1].replace('}>','')}</span>\n<span className='mk-dkblue'>{'}'}</span>\n<span className='mk-white'>{'>'}</span>`;
    }
    if(varAttribute.test(seg)) {
      const words = seg.split('={');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + `<span className='mk-red'>{'='}</span>\n<span className='mk-dkblue'>{'{'}</span>\n<span className='mk-white'>${words[1].replace('}','')}</span>\n<span className='mk-dkblue'>{'}'}</span>`;
    }
    if(startingFuncAttribute.test(seg)) {
      const words = seg.split('={(');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + `<span className='mk-red'>{'='}</span>\n<span className='mk-dkblue'>{'{'}</span>\n<span className='mk-yellow'>{'('}</span>\n<span className='mk-orange'>${words[1].replace(')','')}</span>\n<span className='mk-yellow'>{')'}</span>`;
    }
    if(endingFuncAttribute.test(seg)) {
      const words = seg.split('(');
      return getSpanElement({ colorName: ColorMap.GREEN, indentCount, segment: words[0] }) + '\n' + `<span className='mk-red'>{'('}</span>\n<span className='mk-orange'>${words[1].replace(')}>','')}</span>\n<span className='mk-yellow'>{')'}</span>\n<span className='mk-blue'>{'}'}</span>\n<span className='mk-white'>{'>'}</span>`;
    }
    if(emptyTag.test(seg) || emptyClosingTag.test(seg) || closingTag.test(seg)) {
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: seg, shouldWrap });
    }
    if(propValue.test(seg)) {
      const word = seg.replace('{','').replace('}','');
      return getSpanElement({ colorName: ColorMap.BLUE, indentCount, segment: '{', shouldWrap }) + '\n' + getSpanElement({ colorName: ColorMap.WHITE, segment: word }) + '\n' + getSpanElement({ className: ColorMap.PURPLE, segment: '}', shouldWrap });
    }
    if(numberValue.test(seg)) {
      const word = seg.replace(',','');
      return getSpanElement({ colorName: ColorMap.PURPLE, indentCount, segment: word }) + '\n' + getSpanElement({ className: ColorMap.WHITE, segment: ',', shouldWrap });
    }
    if(numberValue2.test(seg)) {
      const word = seg.replace(';','');
      return getSpanElement({ colorName: ColorMap.PURPLE, indentCount, segment: word }) + '\n' + getSpanElement({ className: ColorMap.WHITE, segment: ';', shouldWrap });
    }
    else {
      return getSpanElement({ colorName: ColorMap.WHITE, indentCount, segment: seg, });
    }
  }).filter(item => item !== BLANKS && item !== BLANKS2).join('\n');

};

const translateCodeToHTML = (input) => {
  const htmlPieces = input.split('\n').map(line => {
    if(line.trim() === '') {
      return "<div className='line' />";
    } else {
      return getDivElement(translateLineToHTML(line));
    }
  }).join('\n');

  return `<>\n${htmlPieces}\n</>`
}

fs.writeFileSync('./tmp/out.html', translateCodeToHTML(currentTranslationTest));
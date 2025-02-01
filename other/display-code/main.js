/*
* The purpose of this file is to generate JSX that allows React Code to be displayable in the UI
* with some level of color coding. This script is not perfect but should reduce 90% of the manual labor.
*/
const fs = require('fs');
const templates = require('./templates');

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
const getSpanElement = (className, seg, indentClass = '', shouldWrap = false) => {
  const segment = shouldWrap ? `{'${seg}'}`: seg;
  return `<span className='${className}${indentClass}'>${segment} </span>`
} 

const translateLineToHTML = (line) => {
  const segments = line.split(' ');
  return segments.map((seg, index) => {
    const indentClass = index === 0 ? ' indent-1': '';
    if(JS_KEYWORDS.find(item => item === seg)) {
      return getSpanElement('mk-red', seg, indentClass);
    } 
    if(JS_VARS.find(item => item === seg)) {
      return getSpanElement('mk-blue', seg, indentClass);
    } 
    if('createContext({' === seg) {
      return getSpanElement('mk-green', 'createContext', indentClass) + '\n' + getSpanElement('mk-yellow', '(', '', true) + '\n' + getSpanElement('mk-purple', '{', '', true);
    } 
    if(JS_SYMBOLS.find(item => item === seg)) {
      return getSpanElement('mk-dkblue', seg, indentClass, true);
    } 
    if('},' === seg) {
      return getSpanElement('mk-dkblue', '}', indentClass, true) + '\n' + getSpanElement('mk-white', ',');
    } 
    if('};' === seg) {
      return getSpanElement('mk-dkblue', '}', indentClass, true) + '\n' + getSpanElement('mk-white', ';');
    } 
    if('),' === seg) {
      return getSpanElement('mk-purple', ')', indentClass, true) + '\n' + getSpanElement('mk-white', ',');
    } 
    if(');' === seg) {
      return getSpanElement('mk-purple', ')', indentClass, true) + '\n' + getSpanElement('mk-white', ';');
    } 
    if('},' === seg) {
      return getSpanElement('mk-yellow', '}', indentClass, true) + '\n' + getSpanElement('mk-white', ',');
    } 
    if('}}' === seg) {
      return getSpanElement('mk-yellow', '}', indentClass, true) + '\n' + getSpanElement('mk-blue', '}', '', true);
    } 
    if('})}' === seg) {
      return getSpanElement('mk-yellow', '}', indentClass, true) + '\n' + getSpanElement('mk-purple', ')', '', true) + '\n' + getSpanElement('mk-blue', '}', '', true);
    } 
    if('({' === seg) {
      return getSpanElement('mk-purple', '(', indentClass, true) + '\n' + getSpanElement('mk-yellow', '{', '', true);
    } 
    if('})' === seg) {
      return getSpanElement('mk-purple', '}', indentClass, true) + '\n' + getSpanElement('mk-yellow', ')', '', true);
    } 
    if('});' === seg) {
      return getSpanElement('mk-purple', '}', indentClass, true) + '\n' + getSpanElement('mk-yellow', ')', '', true) + '\n' + getSpanElement('mk-white', ';', '');
    } 
    if('()' === seg) {
      return getSpanElement('mk-dkblue', seg, indentClass, true);
    } 
    if('=>' === seg) {
      return getSpanElement('mk-blue', seg, indentClass, true);
    } 
    if('([])' === seg) {
      return getSpanElement('mk-blue', '(', indentClass, true) + '\n' + getSpanElement('mk-blue', '[]', '') + '\n' + getSpanElement('mk-blue', ')', '');
    } 
    if('[])' === seg) {
      return getSpanElement('mk-blue', '[]', indentClass, true) + '\n' + getSpanElement('mk-blue', ')', '');
    } 
    if('[]);' === seg) {
      return getSpanElement('mk-blue', '[]', indentClass, true) + '\n' + getSpanElement('mk-blue', ')', '') + '\n' + getSpanElement('mk-white', ';', '');
    } 
    if(bracketWord.test(seg)) {
      const word = seg.replace('[','').replace(',','');
      return `<span className='mk-white${indentClass}'>{'['}</span>\n<span className='mk-white'>${word}</span>\n<span className='mk-white'>{','}</span>`;
    }
    if(endBracketWord.test(seg)) {
      const word = seg.replace(']','');
      return `<span className='mk-white${indentClass}'>${word}</span>\n<span className='mk-white'>{']'}</span>`;
    }
    if(namedFuncComplete.test(seg)) {
      const seperated = seg.replace(')','').replace(';','').split('(',);
      return `<span className='mk-green${indentClass}'>${seperated[0]}</span>\n<span className='mk-purple'>{'('}</span>\n<span className='mk-white'>${seperated[1]}</span>\n<span className='mk-purple'>{')'}</span>\n<span className='mk-white'>{';'}</span>`;
    }
    if(namedFuncStart3.test(seg)) {
      const word = seg.replace('(','').replace('{','');
      return `<span className='mk-white${indentClass}'>${word}</span>\n<span className='mk-white'>{'('}</span>\n<span className='mk-dkblue'>{'{'}</span>`;
    }
    if(namedFuncStart2.test(seg)) {
      const word = seg.replace('(','').replace('{','');
      return `<span className='mk-white${indentClass}'>${word}</span>\n<span className='mk-white'>{'('}</span>\n<span className='mk-dkblue'>{'{'}</span>`;
    }
    if(namedFuncStart.test(seg)) {
      const word = seg.replace('(','');
      return `<span className='mk-white${indentClass}'>{'('}</span>\n<span className='mk-green'>${word}</span>`;
    }
    if(funcComplete.test(seg) && !startingFuncAttribute.test(seg)) {
      const word = seg.replace('(','').replace(')','');
      return `<span className='mk-white${indentClass}'>{'('}</span>\n<span className='mk-white'>${word}</span>\n<span className='mk-white'>{')'}</span>`;
    }
    if(funcEmpty.test(seg)) {
      const word = seg.replace("('');",'');
      return `<span className='mk-white${indentClass}'>${word}</span>\n<span className='mk-white'>{"('');"}</span>`;
    }
    if(methodEmpty.test(seg)) {
      const word = seg.replace('.','').replace('(()','');
      return `<span className='mk-white${indentClass}'>{'.'}</span>\n<span className='mk-green'>${word}</span>\n<span className='mk-blue'>{'('}</span>\n<span className='mk-yellow'>{'()'}</span>`;
    }
    if(method.test(seg)) {
      const segments = seg.replace('.','').split('(');
      return `<span className='mk-white${indentClass}'>{'.'}</span>\n<span className='mk-green'>${segments[0]}</span>\n<span className='mk-blue'>{'('}</span>\n<span className='mk-orange'>${segments[1]}</span>`;
    }
    if(method2.test(seg)) {
      const segments = seg.replace('.','').split('((');
      return `<span className='mk-white${indentClass}'>{'.'}</span>\n<span className='mk-green'>${segments[0]}</span>\n<span className='mk-blue'>{'('}</span>\n<span className='mk-yellow'>{'('}</span>\n<span className='mk-orange'>${segments[1].replace(',','')}</span>\n<span className='mk-white'>{','}</span>`;
    }
    if(startingTagComplete.test(seg)) {
      const word = seg.replace('<','').replace('>','');
      return `<span className='mk-white${indentClass}'>{'<'}</span>\n<span className='mk-red'>${word}</span>\n<span className='mk-white'>{'>'}</span>`;
    }
    if(startingTag.test(seg)) {
      const word = seg.replace('<','');
      return `<span className='mk-white${indentClass}'>{'<'}</span>\n<span className='mk-red'>${word}</span>`;
    }
    if(endingTag.test(seg)) {
      const word = seg.replace('</','').replace('>','');
      return `<span className='mk-white${indentClass}'>{'</'}</span>\n<span className='mk-red'>${word}</span>\n<span className='mk-white'>{'>'}</span>`;
    }
    if(simpleAttribute.test(seg)) {
      const segments = seg.split("='");
      return `<span className='mk-green${indentClass}'> ${segments[0]}</span>\n<span className='mk-red'>{'='}</span>\n<span className='mk-white'>{"'"}</span>\n<span className='mk-yellow'>${segments[1].replace("'",'')}</span>\n<span className='mk-white'>{"'"}</span>`;
    }
    if(simpleAttributeSplitStart.test(seg)) {
      const segments = seg.split("='");
      return `<span className='mk-green${indentClass}'> ${segments[0]}</span>\n<span className='mk-red'>{'='}</span>\n<span className='mk-white'>{"'"}</span>\n<span className='mk-yellow'>${segments[1]}</span>`;
    }
    if(stringValue3.test(seg)) {
      const word = seg.replace("'",'').replace("'",'').replace(";",'');
      return `<span className='mk-yellow${indentClass}'>{"'"}</span>\n<span className='mk-yellow'>{'${word}'}</span>\n<span className='mk-yellow'>{"'"}</span>\n<span className='mk-white'>{';'}</span>`;
    }
    if(stringValue2.test(seg)) {
      const word = seg.replace("'",'').replace("'",'').replace(":",'');
      return `<span className='mk-yellow${indentClass}'>{"'"}</span>\n<span className='mk-yellow'>{'${word}'}</span>\n<span className='mk-yellow'>{"'"}</span>\n<span className='mk-white'>{':'}</span>`;
    }
    if(stringValue.test(seg)) {
      const word = seg.replace("'",'').replace("'",'');
      return `<span className='mk-yellow${indentClass}'>{"'"}</span>\n<span className='mk-yellow'>{'${word}'}</span>\n<span className='mk-yellow'>{"'"}</span>`;
    }
    if(simpleAttributeSplitEnd.test(seg)) {
      const word = seg.replace("'",'');
      return `<span className='mk-yellow${indentClass}'> ${word}</span>\n<span className='mk-red'>{"'"}</span>`;
    }
    if(varAttributeEnd.test(seg)) {
      const segments = seg.split('={');
      return `<span className='mk-green${indentClass}'> ${segments[0]}</span>\n<span className='mk-red'>{'='}</span>\n<span className='mk-dkblue'>{'{'}</span>\n<span className='mk-white'>${segments[1].replace('}>','')}</span>\n<span className='mk-dkblue'>{'}'}</span>\n<span className='mk-white'>{'>'}</span>`;
    }
    if(varAttribute.test(seg)) {
      const segments = seg.split('={');
      return `<span className='mk-green${indentClass}'> ${segments[0]}</span>\n<span className='mk-red'>{'='}</span>\n<span className='mk-dkblue'>{'{'}</span>\n<span className='mk-white'>${segments[1].replace('}','')}</span>\n<span className='mk-dkblue'>{'}'}</span>`;
    }
    if(startingFuncAttribute.test(seg)) {
      const segments = seg.split('={(');
      return `<span className='mk-green${indentClass}'> ${segments[0]}</span>\n<span className='mk-red'>{'='}</span>\n<span className='mk-dkblue'>{'{'}</span>\n<span className='mk-yellow'>{'('}</span>\n<span className='mk-orange'>${segments[1].replace(')','')}</span>\n<span className='mk-yellow'>{')'}</span>`;
    }
    if(endingFuncAttribute.test(seg)) {
      const segments = seg.split('(');
      return `<span className='mk-green${indentClass}'> ${segments[0]}</span>\n<span className='mk-red'>{'('}</span>\n<span className='mk-orange'>${segments[1].replace(')}>','')}</span>\n<span className='mk-yellow'>{')'}</span>\n<span className='mk-blue'>{'}'}</span>\n<span className='mk-white'>{'>'}</span>`;
    }
    if(emptyTag.test(seg) || emptyClosingTag.test(seg) || closingTag.test(seg)) {
      return `<span className='mk-white${indentClass}'>{'${seg}'}</span>`;
    }
    if(propValue.test(seg)) {
      const word = seg.replace('{','').replace('}','');
      return `<span className='mk-blue${indentClass}'>{'{'}</span>\n<span className='mk-white'>{'${word}'}</span>\n<span className='mk-blue'>{'}'}</span>`;
    }
    if(numberValue.test(seg)) {
      const word = seg.replace(',','');
      return `<span className='mk-purple${indentClass}'>{'${word}'}</span>\n<span className='mk-white'>{','}</span>`;
    }
    if(numberValue2.test(seg)) {
      const word = seg.replace(';','');
      return `<span className='mk-purple${indentClass}'>{'${word}'}</span>\n<span className='mk-white'>{';'}</span>`;
    }
    else {
      return getSpanElement('mk-white', seg, indentClass);
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
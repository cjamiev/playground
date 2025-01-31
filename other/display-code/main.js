const fs = require('fs');

const codeToTranslate = '';

const bracketWord = /\[\w+\,/;
const endBracketWord = /\w+\]/;
const namedFuncStart = /\w+\(\w+\,/;
const namedFuncStart2 = /\w+\(\{/;
const namedFuncComplete = /\w+\(\w+\)\;/;
const funcComplete = /\(\w+\)/;
const funcEmpty = /\w+\(\"\"\)/;
const JS_KEYWORDS = ['=', '===', '!==', 'return', 'switch', 'case', 'default'];
const JS_VARS = ['let', 'const'];
const BLANKS = '<span className="mk-white"></span>';
const BLANKS2 = '<span className="mk-white"> </span>';
const JS_SYMBOLS = ['{', '}', '[', ']', '(', ')'];
const getDivElement = (line) => {
  return `<div className='line'>\n${line}</div>`
} 
const getSpanElement = (className, seg, shouldWrap = false) => {
  const segment = shouldWrap ? `{'${seg}'}`: seg;
  return `<span className="${className}">${segment} </span>`
} 

const translateLineToHTML = (line) => {
  const segments = line.split(' ');
  return segments.map(seg => {
    if(JS_KEYWORDS.find(item => item === seg)) {
      return getSpanElement('mk-red', seg);
    } 
    if(JS_VARS.find(item => item === seg)) {
      return getSpanElement('mk-blue', seg);
    } 
    if('createContext({' === seg) {
      return getSpanElement('mk-green', 'createContext') + '\n' + getSpanElement('mk-yellow', '(', true) + '\n' + getSpanElement('mk-purple', '{', true);
    } 
    if(JS_SYMBOLS.find(item => item === seg)) {
      return getSpanElement('mk-dkblue', seg, true);
    } 
    if('},' === seg) {
      return getSpanElement('mk-dkblue', '}', true) + '\n' + getSpanElement('mk-white', ',');
    } 
    if('};' === seg) {
      return getSpanElement('mk-dkblue', '}', true) + '\n' + getSpanElement('mk-white', ';');
    } 
    if('),' === seg) {
      return getSpanElement('mk-purple', ')', true) + '\n' + getSpanElement('mk-white', ',');
    } 
    if('},' === seg) {
      return getSpanElement('mk-yellow', '}', true) + '\n' + getSpanElement('mk-white', ',');
    } 
    if('({' === seg) {
      return getSpanElement('mk-puple', '(', true) + '\n' + getSpanElement('mk-yellow', '{', true);
    } 
    if('})' === seg) {
      return getSpanElement('mk-puple', '}', true) + '\n' + getSpanElement('mk-yellow', ')', true);
    } 
    if('});' === seg) {
      return getSpanElement('mk-puple', '}', true) + '\n' + getSpanElement('mk-yellow', ')', true) + '\n' + getSpanElement('mk-white', ';');
    } 
    if('()' === seg) {
      return getSpanElement('mk-dkblue', seg, true);
    } 
    if('=>' === seg) {
      return getSpanElement('mk-blue', seg, true);
    } 
    if('([])' === seg) {
      return getSpanElement('mk-blue', '(', true) + getSpanElement('mk-blue', '[]', true) + getSpanElement('mk-blue', ')', true) ;
    } 
    if('[])' === seg) {
      return getSpanElement('mk-blue', '[]', true) + getSpanElement('mk-blue', ')', true);
    } 
    if('[]);' === seg) {
      return getSpanElement('mk-blue', '[]', true) + getSpanElement('mk-blue', ')', true) + getSpanElement('mk-white', ';', true);
    } 
    if(bracketWord.test(seg)) {
      const word = seg.replace('[','').replace(',','');
      return `<span className="mk-white">{'['}</span><span className="mk-white">${word}</span><span className="mk-white">{','}</span>`;
    }
    if(endBracketWord.test(seg)) {
      const word = seg.replace(']','')
      return `<span className="mk-white">${word}</span><span className="mk-white">{']'}</span>`;
    }
    if(namedFuncStart.test(seg)) {
      const word = seg.replace('(','').replace(',','')
      return `<span className="mk-white">{'('}</span><span className="mk-white">${word}</span><span className="mk-white">{','}</span>`;
    }
    if(namedFuncStart2.test(seg)) {
      const word = seg.replace('(','').replace('{','')
      return `<span className="mk-white">${word}</span><span className="mk-white">{'('}</span><span className="mk-white">{'{'}</span>`;
    }
    if(namedFuncComplete.test(seg)) {
      const seperated = word.replace(')','').split('(',);
      return `<span className="mk-white">${seperated[0]}</span><span className="mk-white">{'('}</span><span className="mk-white">${seperated[1]}</span>`;
    }
    if(funcComplete.test(seg)) {
      const word = seg.replace('(','').replace(')','')
      return `<span className="mk-white">{'('}</span><span className="mk-white">${word}</span><span className="mk-white">{')'}</span>`;
    }
    if(funcEmpty.test(seg)) {
      const word = seg.replace('("");','')
      return `<span className="mk-white">${word}</span><span className="mk-white">{'("");'}</span>`;
    }
    else {
      return getSpanElement('mk-white', seg);
    }
  }).filter(item => item !== BLANKS && item !== BLANKS2).join('\n');

};

const translateCodeToHTML = (input) => {
  const htmlPieces = input.split('\n').map(line => {
    if(line.trim() === '') {
      return "<div className='line' />"
    } else {
      return getDivElement(translateLineToHTML(line));
    }
  }).join('\n');

  return `<>\n${htmlPieces}\n</>`
}
console.log(translateCodeToHTML(codeToTranslate));

fs.writeFileSync('./tmp/out.html', translateCodeToHTML(codeToTranslate));
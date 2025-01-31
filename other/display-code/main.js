const fs = require('fs');

const codeToTranslate = ``;

const bracketWord = /\[\w+\,/; // [word,
const endBracketWord = /\w+\]/; // word]
const namedFuncStart = /\w+\(\w+\,/; // word(word,
const namedFuncStart2 = /\w+\(\{/; // word({
const namedFuncComplete = /\w+\(\w+\)\;/; // word(word);
const funcComplete = /\(\w+\)/; // (word)
const funcEmpty = /\w+\(\"\"\)/; // word("")

const startingTag = /\<\w+/; // <tag
const startingTagComplete = /\<\w+\>/; // <tag
const endingTag = /\<\/\w+\>/ // </tag>
const simpleAttribute = /\w+\=\"\w+\"/ //attribute="value"
const varAttribute = /\w+\=\{\w+\}/ //attribute={value}
const varAttributeEnd = /\w+\=\{\w+\}\>/ //attribute={value}>
const startingFuncAttribute = /\w+\=\{\(\w+\)/ //attribute={(value)
const emptyTag = /\<\>/
const closingTag = /\/\>/
const emptyClosingTag = /\<\/\>/

const JS_KEYWORDS = ['=', '===', '!==', ' + ', ' ? ', ' : ', 'return', 'switch', 'case', 'default'];
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
    if(');' === seg) {
      return getSpanElement('mk-purple', ')', true) + '\n' + getSpanElement('mk-white', ';');
    } 
    if('},' === seg) {
      return getSpanElement('mk-yellow', '}', true) + '\n' + getSpanElement('mk-white', ',');
    } 
    if('}}' === seg) {
      return getSpanElement('mk-yellow', '}', true) + '\n' + getSpanElement('mk-white', '}', true);
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
      const seperated = seg.replace(')','').split('(',);
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
    if(startingTagComplete.test(seg)) {
      const word = seg.replace('<','').replace('>','')
      return `<span className="mk-white">{'<'}</span><span className="mk-white">${word}</span><span className="mk-white">{'>'}</span>`;
    }
    if(startingTag.test(seg)) {
      const word = seg.replace('<','')
      return `<span className="mk-white">{'<'}</span><span className="mk-white">${word}</span>`;
    }
    if(endingTag.test(seg)) {
      const word = seg.replace('</','').replace('>','')
      return `<span className="mk-white">{'</'}</span><span className="mk-white">${word}</span><span className="mk-white">{'>'}</span>`;
    }
    if(simpleAttribute.test(seg)) {
      const segments = seg.split('="')
      return `<span className="mk-white">${segments[0]}</span><span className="mk-red">{'='}</span><span className="mk-white">{'"'}</span><span className="mk-white">${segments[1].replace('"',"")}</span><span className="mk-white">{'"'}</span>`;
    }
    if(varAttributeEnd.test(seg)) {
      const segments = seg.split('={')
      return `<span className="mk-white">${segments[0]}</span><span className="mk-red">{'='}</span><span className="mk-white">{'{'}</span><span className="mk-white">${segments[1].replace('}>',"")}</span><span className="mk-white">{'}'}</span><span className="mk-white">{'>'}</span>`;
    }
    if(varAttribute.test(seg)) {
      const segments = seg.split('={')
      return `<span className="mk-white">${segments[0]}</span><span className="mk-red">{'='}</span><span className="mk-white">{'{'}</span><span className="mk-white">${segments[1].replace('}',"")}</span><span className="mk-white">{'}'}</span>`;
    }
    if(startingFuncAttribute.test(seg)) {
      const segments = seg.split('={(')
      return `<span className="mk-white">${segments[0]}</span><span className="mk-red">{'='}</span><span className="mk-white">{'{'}</span><span className="mk-white">{'('}</span><span className="mk-white">${segments[1].replace('"',"")}</span><span className="mk-white">{')'}</span>`;
    }
    if(emptyTag.test(seg) || emptyClosingTag.test(seg) || closingTag.test(seg)) {
      return `<span className="mk-white">{'${seg}'}</span>`;
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
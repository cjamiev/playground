const fs = require('fs');
const templates = require('./templates');

const currentTranslationTest = templates.currentTranslationTest;

const bracketWord = /\[\w+\,/; // [word,
const endBracketWord = /\w+\]/; // word]
const namedFuncComplete = /\w+\(\w+\)\;/; // word(word);
const namedFuncStart3 = /\w+\(\{/; // word({
const namedFuncStart2 = /\w+\(\w+\,/; // word(word,
const namedFuncStart = /\w+\(\w+/; // word(word
const funcComplete = /\(\w+\)/; // (word)
const funcEmpty = /\w+\(\'\'\)\;/; // word('');
const methodEmpty = /\.\w+\(\(\)/ // .func(()
const method = /\.\w+\(\w+/ // .func(var
const method2 = /\.\w+\(\(\w+\,/ // .func((var,

const stringValue = /\'.+\'\,/ // 'word',
const stringValue2 = /\'.+\'\:/ // 'word':
const stringValue3 = /\'.+\'\;/ // 'word';
const propValue = /\{\w+\}/ // {word}
const numberValue4 = /\d+\)/ // number)
const numberValue3 = /\d+\;/ // number;
const numberValue2 = /\d+\,/ // number,
const numberValue = /\d+/ // number
const booleanValue = ['true', 'false']; // need to add ; or );

const startingTag = /\<\w+/; // <tag
const startingTagComplete = /\<\w+\>/; // <tag>
const endingTag = /\<\/\w+\.*\w*\>/ // </tag> or </customtag.word>
const simpleAttribute = /\w+\=\'\w+\'/ // attribute='value'
const simpleAttributeSplitStart = /\w+\=\'\w+/ // attribute='value
const simpleAttributeSplitEnd = /\w+\'/ // value'
const varAttribute = /\w+\=\{\w+\}/ // attribute={value}
const varAttributeEnd = /\w+\=\{\w+\.*\w+\}\>/ // attribute={value}> or attribute={obj.value}> 
const startingFuncAttribute = /\w+\=\{\(\w*\)/ // attribute={(value) or attribute={() 
const endingFuncAttribute = /\w+\(\w+\.*\w*\)\}\>/ // attribute(value)}> or attribute(obj.id)}> 
const emptyTag = /\<\>/ // <>
const closingTag = /\/\>/ // />
const emptyClosingTag = /\<\/\>/ // </>

const wordRegex = /\w+/; // alphanumeric
const startsWithWord = /^\w+.+/
const endsWithWord = /.+\w+$/
const JS_KEYWORDS = ['=', '===', '!==', '=>', '+', '-', '%', '/', '?', '&&', '||', '+=', ':', 'if', 'else', 'return', 'switch', 'for', 'case', 'default', 'export', 'import', 'from'];
const blockSymbols = ['{', '}', '[', ']', '(', ')'];
const newLine = '\n';
const JS_VARS = ['let', 'const', 'function'];

const mapLineToObject = (line) => {
  const segments = line.split(' ').filter(Boolean);
  return segments.map(segment => {
    if(segment === newLine) {
      return [{ segment }];
    }
    if(JS_VARS.find(key => key === segment)) {
      return [{ segment, colorCode: 'Blue' }];
    }
    if(JS_KEYWORDS.find(key => key === segment)) {
      return [{ segment, colorCode: 'Red' }];
    }
    if(blockSymbols.find(key => key === segment)) {
      return [{ segment }];
    }
    if(!wordRegex.test(segment)) {
      const symbols = segment.split('');

      return symbols.map(symbol => { return { segment: symbol }});
    }
    if(bracketWord.test(segment)) {
      const symbols = segment.split(wordRegex);
      const word = segment.match(wordRegex)[0];

      return [{ segment: symbols[0]}, { segment: word }, { segment: symbols[1]}];
    }
    if(endBracketWord.test(segment)) {
      const word = segment.replace(']','');

      return [{ segment: word }, { segment: ']'}];
    }
    if(namedFuncComplete.test(segment)) {
      const words = segment.replace(');','').split('(');

      return [{ segment: words[0]}, { segment: '(' }, { segment: words[1]}, { segment: ')' }, { segment: ';' }];
    }
    if(namedFuncStart3.test(segment)) {
      const word = segment.replace('({','')

      return [{ segment: word}, { segment: '(' }, { segment: '{' }];
    }
    if(namedFuncStart2.test(segment)) {
      const words = segment.replace(',','').split('(');

      return [{ segment: words[0]}, { segment: '(' }, { segment: words[1]}, { segment: ',' }];
    }
    if(namedFuncStart.test(segment)) {
      const words = segment.split('(');

      return [{ segment: words[0]}, { segment: '(' }, { segment: words[1]}, ];
    }
    if(funcComplete.test(segment) && !startingFuncAttribute.test(segment)) {
      const word = segment.replace('(','').replace(')','');

      return [{ segment: '(' }, { segment: word}, { segment: ')' }];
    }
    if(funcEmpty.test(segment)) {
      const word = segment.replace("('');",'');

      return [{ segment: word}, { segment: '(' }, { segment: "''" }, { segment: ')' }];
    }
    if(methodEmpty.test(segment)) {
      const symbols = segment.split(wordRegex);
      const word = segment.match(wordRegex)[0];

      return [{ segment: symbols[0]}, { segment: word }, { segment: symbols[1]}, { segment: symbols[2]}, { segment: symbols[3]}];
    }
    if(method.test(segment)) {
      const words = segment.replace('.','').split('(');

      return [{ segment: '.' }, { segment: words[0]}, { segment: '(' }, { segment: words[1]} ];
    }
    if(method2.test(segment)) {
      const words = segment.replace('.','').replace(',','').split('(');

      return [{ segment: '.' }, { segment: words[0]}, { segment: '(' }, { segment: '(' }, { segment: words[1]}, { segment: ',' }, ];
    }
    if(startingTagComplete.test(segment)) {
      const word = segment.replace('<','').replace('>','')

      return [{ segment: '<' }, { segment: word, isTag: true }, { segment: '>' }];
    }
    if(startingTag.test(segment)) {
      const word = segment.replace('<','');
      
      return [{ segment: '<' }, { segment: word, isTag: true }];
    }
    if(endingTag.test(segment)) {
      const word = segment.replace('</','').replace('>','');
      
      return [{ segment: '</' }, { segment: word, isTag: true }, { segment: '>' },];
    }
    if(simpleAttribute.test(segment)) {
      const words = segment.replaceAll("'",'').split('=','');
      
      return [{ segment: words[0], isAttribute: true }, { segment: '=' }, { segment: "'" },{ segment: words[1] }, { segment: "'" },];
    }
    if(simpleAttributeSplitStart.test(segment)) {
      const words = segment.replace("'",'').split('=','');
      
      return [{ segment: words[0], isAttribute: true }, { segment: '=' }, { segment: "'" },{ segment: words[1] } ];
    }
    if(stringValue3.test(segment)) {
      const word = segment.replace("'",'').replace("';",'');

      return [{ segment: "'"}, { segment: word }, { segment: "'"}, { segment: ";"}];
    }
    if(stringValue2.test(segment)) {
      const word = segment.replace("'",'').replace("':",'');

      return [{ segment: "'"}, { segment: word }, { segment: "'"}, { segment: ":"}];
    }
    if(stringValue.test(segment)) {
      const word = segment.replace("'",'').replace("',",'');

      return [{ segment: "'"}, { segment: word }, { segment: "'"}, { segment: ","}];
    }
    if(simpleAttributeSplitEnd.test(segment)) {
      const word = segment.replace("'",'');
      
      return [{ segment: word }, { segment: "'" },];
    }
    if(varAttributeEnd.test(segment)) {
      const words = segment.replace("}>",'').split('={');
      
      return [{ segment: words[0], isAttribute: true }, { segment: "=" }, { segment: "{" }, { segment: words[1] }, { segment: "}" }, { segment: ">" }];
    }
    if(varAttribute.test(segment)) {
      const words = segment.replace("}",'').split('={');
      
      return [{ segment: words[0], isAttribute: true }, { segment: "=" }, { segment: "{" }, { segment: words[1] }, { segment: "}" },];
    }
    if(startingFuncAttribute.test(segment)) {
      const words = segment.replace(')','').split("={(",'');
      
      return [{ segment: words[0], isAttribute: true }, { segment: "=" }, { segment: "{" }, { segment: "(" }, { segment: words[1] }, { segment: ")" },];
    }
    if(endingFuncAttribute.test(segment)) {
      const words = segment.replace(')}>','').split("(",'');
      
      return [{ segment: words[0], isAttribute: true }, { segment: "(" }, { segment: words[1] }, { segment: ")" }, { segment: "}" }, { segment: ">" },];
    }
    if(emptyTag.test(segment) || emptyClosingTag.test(segment) || closingTag.test(segment)) {
      return [{ segment }];
    }
    if(propValue.test(segment)) {
      const word = segment.replace('{','').replace('}','');
      return [{ segment: '{' }, { segment: word }, { segment: '}' }];
    }
    if(numberValue3.test(segment)) {
      const word = segment.replace(';','');

      return [{ segment: word }, { segment: ';'}];
    }
    if(numberValue2.test(segment)) {
      const word = segment.replace(',','');

      return [{ segment: word }, { segment: ','}];
    }
    if(numberValue.test(segment)) {
      return [{ segment }];
    }
    if(startsWithWord.test(segment)) {
      const symbols = segment.replace(wordRegex,'').split('');
      const word = segment.match(wordRegex)[0];

      return [{segment: word}].concat(symbols.map(symbol => { return { segment: symbol }}));
    }
    if(endsWithWord.test(segment)) {
      const symbols = segment.replace(wordRegex,'').split('');
      const word = segment.match(wordRegex)[0];

      return symbols.map(symbol => { return { segment: symbol }}).concat([{segment: word}]);
    }

    return [{ segment }];
  })
};

const mapCodeToObject = (input) => {
  const codeAsObjects = input
    .split('\n')
    .map(line => {
      if(line.trim() === '') {
        return [[{ segment: '\n' }]];
      }
      else {
        return mapLineToObject(line);
      } 
  }).reduce((current, accumulator) => {return [...current, ...accumulator ]},[])
  .reduce((current, accumulator) => {return [...current, ...accumulator ]},[]);

  return codeAsObjects;
}

const result = JSON.stringify(mapCodeToObject(currentTranslationTest), undefined, 2);

fs.writeFileSync('./tmp/out.json', result);

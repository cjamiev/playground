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
const numberValue3 = /\d+\)/ // number)
const numberValue2 = /\d+\,/ // number,
const numberValue = /\d+/ // number
const wordValue = /\w+\;/ // value;
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
const objectValue = /[a-zA-Z.]+/ // fail safe for something like <({obj.param.param})>
const startsWithWord = /^\w+.+/
const endsWithWord = /.+\w+$/

const standardTagList = ['div', 'button', 'input', 'span', 'ul', 'li', 'label'];

const mapLineOfCode = (line) => {
  const segments = line.split(' ').filter(Boolean);
  return segments.map(segment => {
    if('=>' === segment) {

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

      return [{ segment: word}, { segment: '(' }, { segment: "''" }, { segment: ')' }, { segment: ';' }];
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
      const isTag = standardTagList.some(item => item === word);
      const isCustomTag = !isTag;

      return [{ segment: '<' }, { segment: word, isTag, isCustomTag }, { segment: '>' }];
    }
    if(startingTag.test(segment)) {
      const word = segment.replace('<','');
      const isTag = standardTagList.some(item => item === word);
      const isCustomTag = !isTag;
      
      return [{ segment: '<' }, { segment: word, isTag, isCustomTag }];
    }
    if(endingTag.test(segment)) {
      const word = segment.replace('</','').replace('>','');
      const isTag = standardTagList.some(item => item === word);
      const isCustomTag = !isTag;
      
      return [{ segment: '</' }, { segment: word, isTag, isCustomTag }, { segment: '>' },];
    }
    if(simpleAttribute.test(segment)) {
      const words = segment.replaceAll("'",'').split('=');
      
      return [{ segment: words[0], isAttribute: true }, { segment: '=' }, { segment: "'", isStringLiteral: true },{ segment: words[1], isStringLiteral: true }, { segment: "'", isStringLiteral: true },];
    }
    if(simpleAttributeSplitStart.test(segment)) {
      const words = segment.replace("'",'').split('=');
      
      return [{ segment: words[0], isAttribute: true }, { segment: '=' }, { segment: "'", isStringLiteral: true },{ segment: words[1], isStringLiteral: true } ];
    }
    if(stringValue3.test(segment)) {
      const word = segment.replace("'",'').replace("';",'');

      return [{ segment: "'", isStringLiteral: true}, { segment: word, isStringLiteral: true }, { segment: "'", isStringLiteral: true}, { segment: ";"}];
    }
    if(stringValue2.test(segment)) {
      const word = segment.replace("'",'').replace("':",'');

      return [{ segment: "'", isStringLiteral: true}, { segment: word, isStringLiteral: true }, { segment: "'", isStringLiteral: true}, { segment: ":"}];
    }
    if(stringValue.test(segment)) {
      const word = segment.replace("'",'').replace("',",'');

      return [{ segment: "'", isStringLiteral: true}, { segment: word, isStringLiteral: true }, { segment: "'", isStringLiteral: true}, { segment: ","}];
    }
    if(simpleAttributeSplitEnd.test(segment)) {
      const word = segment.replace("'",'');
      
      return [{ segment: word, isStringLiteral: true }, { segment: "'", isStringLiteral: true },];
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
      const words = segment.replace(')','').split("={(");
      
      return [{ segment: words[0], isAttribute: true }, { segment: "=" }, { segment: "{" }, { segment: "(" }, { segment: words[1] }, { segment: ")" },];
    }
    if(endingFuncAttribute.test(segment)) {
      const words = segment.replace(')}>','').split("(");
      
      return [{ segment: words[0], isAttribute: true }, { segment: "(" }, { segment: words[1] }, { segment: ")" }, { segment: "}" }, { segment: ">" },];
    }
    if(emptyTag.test(segment) || emptyClosingTag.test(segment) || closingTag.test(segment)) {
      return [{ segment }];
    }
    if(propValue.test(segment)) {
      const word = segment.replace('{','').replace('}','');
      return [{ segment: '{' }, { segment: word }, { segment: '}' }];
    }
    if(wordValue.test(segment)) {
      const word = segment.replace(';','');

      return [{ segment: word, isValue: true }, { segment: ';'}];
    }
    if(numberValue3.test(segment)) {
      const word = segment.replace(')','');

      return [{ segment: word, isValue: true }, { segment: ')'}];
    }
    if(numberValue2.test(segment)) {
      const word = segment.replace(',','');

      return [{ segment: word, isValue: true }, { segment: ','}];
    }
    if(numberValue.test(segment)) {
      return [{ segment, isValue: true }];
    }
    if(booleanValue.find(key => key === segment)) {
      return [{ segment, isValue: true }];
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
    if(objectValue.test(segment)) {
      const matchedWord = segment.match(objectValue);
      const newAry = segment.split(objectValue).join('').split('');
      
      newAry.splice(matchedWord.index, 0, matchedWord[0])
      return newAry.map(segment => { return { segment } });
    }

    return [{ segment }];
  })
};

const parseCode = (input) => {
  const codeAsObjects = input
    .split('\n')
    .map((line) => {
      if(line.trim() === '') {
        return [[{ segment: '\n' }]];
      }
      else {
        return mapLineOfCode(line).concat([[{ segment: '\n'}]]);
      } 
  })
  .reduce((current, accumulator) => {return [...current, ...accumulator ]},[])
  .reduce((current, accumulator) => {return [...current, ...accumulator ]},[]);

  return codeAsObjects;
}

module.exports = {
  parseCode
};
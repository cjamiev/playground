const { capitalizeFirstLetter, toCamelCaseFromDashCase } = require('./stringHelper');
const { getAttributeList } = require('./attributeHelper');

const ZERO = 0;
const ONE = 1;

const handleRemoveMode = (line, counter) => {
  if (counter === ZERO && line.includes('</')) {
    return { flag: false, counter: 0 };
  } else if (line.includes('</')) {
    return { flag: true, counter: counter - ONE };
  } else if (line.includes('<') && line.includes('/>')) {
    return { flag: true, counter };
  } else if (line.includes('<') && line.includes('>')) {
    return { flag: true, counter: counter + ONE };
  }
};

const trimSvgComponent = (section) => {
  let isRemoving = false;
  let count = 0;

  return section
    .split('\n')
    .filter((currentLine) => !(currentLine.includes('data-testid="remove-') && currentLine.includes('/>')))
    .map((currentLine) => {
      if (isRemoving) {
        const { flag, counter } = handleRemoveMode(currentLine, count);

        isRemoving = flag;
        count = counter;

        return '';
      } else if (!isRemoving && currentLine.includes('data-testid="remove-')) {
        isRemoving = true;

        return '';
      }

      return currentLine;
    })
    .filter(Boolean)
    .join('\n');
};

const handleConditionMode = (line, counter) => {
  if (counter === ZERO && line.includes('</')) {
    return { flag: false, counter: 0 };
  } else if (line.includes('</')) {
    return { flag: true, counter: counter - ONE };
  } else if (line.includes('<') && line.includes('/>')) {
    return { flag: true, counter };
  } else if (line.includes('<') && line.includes('>')) {
    return { flag: true, counter: counter + ONE };
  }
};

const findSubcomponent = (section) => {
  let isAddingSubcomponent = false;
  let count = 0;
  const subcomponents = [];
  const currentSubcomponent = {
    name: '',
    value: []
  };

  const updatedSvgObj = section
    .split('\n')
    .map((currentLine) => {
      if (!isAddingSubcomponent && currentLine.includes('data-testid="subcomponent-')) {
        currentSubcomponent.name &&
          subcomponents.push({
            name: currentSubcomponent.name,
            value: currentSubcomponent.value.join('\n')
          });
        isAddingSubcomponent = true;

        const dashCaseName = getAttributeList(currentLine, 'data-testid="subcomponent-')
          [ZERO].replace('data-testid="subcomponent-', '')
          .replace('"', '');
        const name = capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName));
        currentSubcomponent.name = name;
        currentSubcomponent.value = [currentLine];

        return '';
      } else if (isAddingSubcomponent) {
        const { flag, counter } = handleConditionMode(currentLine, count);

        isAddingSubcomponent = flag;
        count = counter;
        currentSubcomponent.value.push(currentLine);

        return '';
      }

      return currentLine;
    })
    .filter(Boolean)
    .join('\n');

  currentSubcomponent.name &&
    subcomponents.push({
      name: currentSubcomponent.name,
      value: currentSubcomponent.value.join('\n')
    });

  return { subcomponents, updatedSvgObj };
};

const getSvgSubcomponents = (section) => {
  let subcomponents = [];

  let updatedSvgObj = section
    .split('\n')
    .map((currentLine) => {
      if (currentLine.includes('data-testid="subcomponent-') && currentLine.includes('/>')) {
        const dashCaseName = getAttributeList(currentLine, 'data-testid="subcomponent-')
          [ZERO].replace('data-testid="subcomponent-', '')
          .replace('"', '');
        const name = capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName));
        subcomponents.push({
          name,
          value: currentLine
        });

        return `<${name}SVG DELETE />`;
      }

      return currentLine;
    })
    .filter(Boolean)
    .join('\n');

  while (updatedSvgObj.includes('data-testid="subcomponent-')) {
    const result = findSubcomponent(updatedSvgObj);
    subcomponents = subcomponents.concat(result.subcomponents);

    updatedSvgObj = result.updatedSvgObj;
  }

  // Error correction not sure what is the source of this problem
  updatedSvgObj = updatedSvgObj
    .split('\n')
    .filter((item) => !item.includes('DELETE'))
    .join('\n');

  return { updatedSvgObj, subcomponents };
};

const addCondition = (section) => {
  let isAddingCondition = false;
  let count = 0;
  const conditions = [];

  const updatedSvgObj = section
    .split('\n')
    .map((currentLine) => {
      if (!isAddingCondition && currentLine.includes('data-testid="condition-')) {
        isAddingCondition = true;

        const dashCaseName = getAttributeList(currentLine, 'data-testid="condition-')
          [ZERO].replace('data-testid="condition-', '')
          .replace('"', '');
        const name = `show${capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName))}`;
        conditions.push(name);

        return currentLine.replace('data-testid="condition-', 'data-testid="').replace('<', `{ ${name} && <`);
      } else if (isAddingCondition) {
        const { flag, counter } = handleConditionMode(currentLine, count);

        isAddingCondition = flag;
        count = counter;

        return isAddingCondition ? currentLine : `${currentLine} }`;
      }

      return currentLine;
    })
    .join('\n');

  return { conditions, updatedSvgObj };
};

const addConditionsToSvgComponents = (section) => {
  let conditions = [];

  let updatedSvgObj = section
    .split('\n')
    .map((currentLine) => {
      if (currentLine.includes('data-testid="condition-') && currentLine.includes('/>')) {
        const dashCaseName = getAttributeList(currentLine, 'data-testid="condition-')
          [ZERO].replace('data-testid="condition-', '')
          .replace('"', '');
        const name = `show${capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName))}`;
        conditions.push(name);

        return currentLine
          .replace('data-testid="condition-', 'data-testid="')
          .replace('<', `{ ${name} && <`)
          .replace('/>', '/> }');
      }

      return currentLine;
    })
    .join('\n');

  while (updatedSvgObj.includes('data-testid="condition-')) {
    const result = addCondition(updatedSvgObj);
    conditions = conditions.concat(result.conditions);

    updatedSvgObj = result.updatedSvgObj;
  }

  return { updatedSvgObj, conditions };
};

module.exports = { trimSvgComponent, getSvgSubcomponents, addConditionsToSvgComponents };

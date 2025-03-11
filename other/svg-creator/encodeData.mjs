const ZERO = 0;
const ONE = 1;
const TWO = 2;

// {} = '', { showVariable: true } = 'Variable', { showVariable: true, showVariable2: true } = 'Variable|Variable2
const encodeConditions = (conditions) => {
  const keys = Object.keys(conditions);

  if(!keys) {
    return;
  } else {
    return keys
      .map(key => key.replace('show',''))
      .join('|');
  }
};
const decodeConditions = (encodedConditions) => {
  const keyValuePair = encodedConditions ? encodedConditions
    .split('|')
    .map(name => `"show${name}":true`)
    .join(',') : '';

  return `{${keyValuePair}}`;
};

// 'translate(0,0)' -> '', 'translate(10,0)' -> 't(10,0)', translate(10,0) scale(2,1) -> t(10,0) sc(2,1)
const encodeTransform = (transform) => {
  return transform
    .replace('translate(0,0)','')
    .replace('translate(','t(')
    .replace('rotate(','r(')
    .replace('skew(','sk(')
    .replace('scale(','sc(');
};
const decodeTransform = (encodedTransform) => {
  if(!encodedTransform) {
    return 'translate(0,0)';
  }

  const decodedTransform = encodedTransform
    .replace('t(','translate(')
    .replace('r(','rotate(')
    .replace('sk(','skew(')
    .replace('sc(','scale(');

  return decodedTransform.includes('translate(')
    ? decodedTransform
    : `translate(0,0)${decodedTransform}`;
};

// { component: 'Note', transform:'translate(0,0) scale(2,1)', conditions: { showVariable: true, showVariable2: true }}
// { component: 'Note', transform:'translate(0,0) scale(2,1)', conditions: { }}
// { component: 'Note', transform:'translate(0,0)', conditions: { }}
const encodeObject = ({ component, transform, conditions }) => {
  const encodedConditions = encodeConditions(conditions);
  const conditionsParam = encodedConditions ? `?${encodedConditions}`: '';
  const encodedTransform = encodeTransform(transform);
  const transformParam = encodedTransform ? `@${encodedTransform}`: '';

  return `$${component}${conditionsParam}${transformParam}`;
};
const decodeObject = (encodedObject) => {
  const sections = encodedObject
    .replace('@',':@')
    .replace('?',':?')
    .split(':');

  const encodedConditions = sections[ONE] && sections[ONE].includes('?') ? sections[ONE].replace('?','') : '';
  const encodedTransform = sections[ONE] && sections[TWO]
    ? sections[TWO].replace('@','')
    : sections[ONE] && sections[ONE].includes('@')
      ? sections[ONE].replace('@','')
      : '';

  const decodedName = `"component":"${sections[ZERO].replace('$','')}"`;
  const decodedConditions = `"conditions":${decodeConditions(encodedConditions)}`;
  const decodedTransform = `"transform":"${decodeTransform(encodedTransform)}"`;

  return `{ ${decodedName},${decodedConditions},${decodedTransform}}`;
};

// [{ component:'MeasureStart', transform:'translate(10,0)', conditions:{showClefBrace:true}},{ component:'Treble', transform:'translate(0,0)', conditions:{showGClefOttavaAlta:true,showGClefOttavaBass:true}},{ component:'Bass', transform:'translate(0,0)', conditions:{showFClefOttavaAlta:true,showFClefOttavaBass:true}}]
const encodeSubcomponents = (subcomponents) => {
  return subcomponents.map(entry => {
    return encodeObject(entry);
  }).join('');
};
const decodeSubcomponents = (encodedSubcomponents) => {
  const encodedSections = encodedSubcomponents.split('$').filter(Boolean);
  return encodedSections.map(encoded => {
    return JSON.parse(decodeObject(encoded));
  });
};

const encodeComponent = ({ component, conditions, transform, subcomponents }) => {
  const encodedConditions = encodeConditions(conditions);
  const conditionsParam = encodedConditions ? `?${encodedConditions}`: '';
  const encodedTransform = encodeTransform(transform);
  const transformParam = encodedTransform ? `@${encodedTransform}`: '';
  const encodedSubcomponents = subcomponents.map(entry => {
    return encodeObject(entry);
  }).join('');
  const subcomponentsParam = encodedSubcomponents ? `_${encodedSubcomponents}`: '';

  return `$${component}${conditionsParam}${transformParam}${subcomponentsParam}`;
};
const decodeComponent = (component) => {
  const encodedSections = component.split('_').filter(Boolean);
  const encodedObject = encodedSections[ZERO];
  const encodedSubcomponents = encodedSections[ONE];

  const decodedObject = JSON.parse(decodeObject(encodedObject));
  const decodedSubcomponents = encodedSubcomponents ? decodeSubcomponents(encodedSubcomponents) : [];

  return {...decodedObject, subcomponents: decodedSubcomponents };
};

const encodeData = (data) => {
  return data.map(entry => {
    return encodeComponent(entry);
  }).join('\\');
};
const decodeData = (encodedData) => {
  const encodedSections = encodedData.split('\\').filter(Boolean);
  return encodedSections.map(entry => {
    return decodeComponent(entry);
  });
};

export {
  encodeData,
  decodedData
};
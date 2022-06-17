const ZERO = 0;
const ONE = 1;
const hasDigitRegex = new RegExp(/\d/, 'gm');
const styleFilterList = [
  'opacity:1',
  'opacity:0.99',
  'fill:#000000',
  'stroke:#000000',
  'overflow:visible',
  '-inkscape-font-specification',
  'stroke-dasharray:none',
  'stroke-linecap',
  'stroke-linejoin',
  'font-family:sans-serif',
  'font-style:normal',
  'font-weight:normal',
  'line-height',
  'font-stretch:normal',
  'font-variant-caps:normal',
  'font-variant-east-asian:normal',
  'font-variant-ligatures:normal',
  'font-variant-numeric:normal',
  'font-variant:normal'
];

const getAttributeList = (line, attr) => {
  if (!line.includes(attr)) {
    return [];
  }

  const attributeList = line
    .replace(/\s*<\w+\s+/, '')
    .split('" ')
    .map((item) => `${item.trim()}"`);
  const attrRegex = new RegExp(`^${attr}`);

  return attributeList.filter((item) => attrRegex.test(item));
};

const getSortedStyleAttribute = (styleLine) => {
  if (!styleLine || !styleLine.includes('style="')) {
    return '';
  }

  const sortedLine = styleLine
    .replace('style="', '')
    .replace('"', '')
    .split(';')
    .filter((prop) => {
      if (!prop) {
        return false;
      }

      const shouldRemove = styleFilterList.map((item) => {
        return prop.includes(item);
      });

      return !shouldRemove.some((item) => Boolean(item));
    })
    .sort()
    .join(';');

  return sortedLine ? `style="${sortedLine}"` : '';
};

const sortAttributes = (data) => {
  const lines = data.split('\n');

  const updatedLines = lines.map((currentLine) => {
    const attributes = currentLine.split(' ');
    const id = attributes.find((item) => item.includes('data-testid'));
    const ariaLabel =
      id && !hasDigitRegex.test(id)
        ? `aria-label${id
            .replace('data-testid', '')
            .replace('subcomponent-', '')
            .replace('component-', '')
            .replace(/-/g, ' ')}`
        : '';
    const className = attributes.find((item) => item.includes('className'));
    const filteredLine = attributes.filter((item) => !item.includes('data-testid') && !item.includes('className'));
    const sortedLine = [filteredLine[ZERO], id, className, ariaLabel, ...filteredLine.splice(ONE)];

    return sortedLine.join(' ').replace(/[ ]+/g, ' ');
  });

  return updatedLines.join('\n');
};

export { getAttributeList, getSortedStyleAttribute, sortAttributes };

import React, { useState } from 'react';
import Page from 'components/layout';
import Text from 'components/form/Text';
import Button from 'components/button';
import { copyToClipboard } from 'helper/copy';
import { toDashCaseFromCamelCase } from 'stringHelper';
import './generator.css';

const getBoxStyle = ({ backgroundColor, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius }) => {
  const radiusTopLeft = topLeftRadius ? `${topLeftRadius}em`: '0em';
  const radiusTopRight = topRightRadius ? `${topRightRadius}em`: '0em';
  const radiusBottomRight = bottomRightRadius ? `${bottomRightRadius}em`: '0em';
  const radiusBottomLeft = bottomLeftRadius ? `${bottomLeftRadius}em`: '0em';

  return {
    border: '1px solid #000',
    width: '40em',
    height: '20em',
    backgroundColor,
    borderRadius: `${radiusTopLeft} ${radiusTopRight} ${radiusBottomRight} ${radiusBottomLeft}`
  };
};

const getCSSFromJSON = (style) => {
  const parsedCSS = toDashCaseFromCamelCase(JSON.stringify(style))
    .replace('{','{\n  ')
    .replace('}','\n}')
    .replace(/"/g,'')
    .replace(/,/g,';\n  ');

  return parsedCSS;
};

const Generator = () => {
  const [topLeftRadius, setTopLeftRadius] = useState('0');
  const [topRightRadius, setTopRightRadius] = useState('0');
  const [bottomRightRadius, setBottomRightRadius] = useState('0');
  const [bottomLeftRadius, setBottomLeftRadius] = useState('0');
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  const handleTopLeftRadiusChange = ({ selected }) => {
    setTopLeftRadius(selected);
  };

  const handleTopRightRadiusChange = ({ selected }) => {
    setTopRightRadius(selected);
  };

  const handleBottomRightRadiusChange = ({ selected }) => {
    setBottomRightRadius(selected);
  };

  const handleBottomLeftRadiusChange = ({ selected }) => {
    setBottomLeftRadius(selected);
  };

  const handleBackgroundColorChange = ({ target: { value }}) => {
    setBackgroundColor(value);
  };

  const boxStyle = getBoxStyle({ backgroundColor, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius });
  const generatedCSS = getCSSFromJSON(boxStyle);

  return (
    <Page>
      <Text label='Top Left' selected={topLeftRadius} onChange={handleTopLeftRadiusChange} />
      <Text label='Top Right' selected={topRightRadius} onChange={handleTopRightRadiusChange} />
      <Text label='Bottom Right' selected={bottomRightRadius} onChange={handleBottomRightRadiusChange} />
      <Text label='Bottom Left' selected={bottomLeftRadius} onChange={handleBottomLeftRadiusChange} />
      <label>BG Color </label><input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
      <div className="container--center">
        <div style={boxStyle}> Text </div>
        <Button
          label="Copy"
          classColor="primary"
          onClick={
            () => {
              copyToClipboard(generatedCSS);
            }
          } />
        <pre>{generatedCSS}</pre>
      </div>
    </Page>
  );
};

export default Generator;

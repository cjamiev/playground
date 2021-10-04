/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import TextArea from 'components/form/TextArea';
import Pagination from 'components/pagination';
import { IconButton } from 'components/button';
import TableRenderer from '../TableRenderer';
import { ICON_TYPES } from 'constants/icon';
import { copyToClipboard } from 'helper/copy';
import { dataGenerator } from 'randomHelper';
import { parseObject } from 'type-check';

const ONE = 1;
const data = {
  key: 'test',
  key2: true,
  key3: 1,
  key4: [1,2,3],
  key41: ['test1','test2','test3'],
  key42: [{ one: 1},{ two: 2}],
  key5: {
    key: 'test',
    key2: true,
    key3: 1
  }
};

const TestDataGen = () => {
  const [sample, setSample] = useState(JSON.stringify(data, undefined, 2));
  const parsedSample = parseObject(sample);
  const result = parsedSample ? dataGenerator(parseObject(sample),10):[];
  const content = result.map((item, index) => {
    const keys = Object.keys(item);
    const entry = keys.map(key => {
      return { key, 'value': item[key]};
    });
    const pageNumber = index + ONE;
    return <TableRenderer key={index} label={'table ' + pageNumber} source={entry} />;
  });

  return <div className="container--center">
    <TextArea
      ariaLabel='Sample text area'
      selected={sample}
      onChange={({ selected }) => { setSample(selected); }}
    />
    <IconButton type={ICON_TYPES.COPY} onClick={() => { copyToClipboard(JSON.stringify(result)); }} />
    <Pagination content={content} />
  </div>;
};

export default TestDataGen;

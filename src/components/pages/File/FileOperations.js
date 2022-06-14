import React, { useState } from 'react';
import Radio from 'components/atoms/Form/Radio';
import StringOperations from './StringOperations';
import JsonOperations from './JsonOperations';
import RegexOperations from './RegexOperations';
import { OPERATION_TYPES } from './helper';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const FileOperations = ({ content, onChange }) => {
  const [ops, setOps] = useState(OPERATION_TYPES);
  const selectedOp = ops.find((item) => item.selected).value;

  return (
    <div className="container--center">
      <Radio
        label="Select Operation"
        horizontal
        values={ops}
        onChange={({ values }) => {
          setOps(values);
        }}
      />
      {selectedOp === ZERO && <StringOperations content={content} onChange={onChange} />}
      {selectedOp === ONE && <JsonOperations content={content} onChange={onChange} />}
      {selectedOp === TWO && <RegexOperations content={content} onChange={onChange} />}
    </div>
  );
};

export default FileOperations;

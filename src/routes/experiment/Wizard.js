import React, { useState } from 'react';
import Button from 'components/button';
import DynamicForm, { hasError, updateData } from 'components/form/DynamicForm';
import DynamicWizard from 'components/wizard';
import TableRenderer from './TableRenderer';
import { testTitles, testData } from './data';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const Wizard = () => {
  const [payload, setPayload] = useState(testData);

  const titles = testTitles;

  return (
    <>
      <DynamicWizard
        sectionTitles={titles}
        data={testData}
        onSubmit={(d) => {
          setPayload(d);
        }}
      />
      <div className="container--center">
        {payload.map((entry, index) => {
          return <TableRenderer key={titles[index]} label={titles[index]} source={entry} />;
        })}
      </div>
    </>
  );
};

export default Wizard;

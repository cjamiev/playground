import React, { useState } from 'react';
import Button from 'components/button';
import DynamicForm, { hasError, updateData } from 'components/form/DynamicForm';
import { Wizard } from 'components/wizard';
import TableRenderer from '../TableRenderer';
import { testData } from './data';

const ZERO = 0;
const ONE = 1;

export const TestWizard = () => {
  const [sectionIndex, setSectionIndex] = useState(ZERO);
  const [formData, setFormData] = useState(testData);

  const onPrev = () => {
    setSectionIndex(s => s - ONE);
  };

  const onNext = () => {
    if(!hasError(formData[sectionIndex])) {
      setSectionIndex(s => s + ONE);
    }
  };

  const handleChange = (changedData) => {
    const updatedFields = updateData(formData[sectionIndex], changedData);
    const updatedFormData = formData.map((entry, index) => {
      if(index === sectionIndex) {
        return updatedFields;
      }

      return entry;
    });

    setFormData(updatedFormData);
  };

  const titles = ['Section One', 'Section Two', 'Section Three'];
  const data = formData.map((item, index) => {
    return <DynamicForm key={titles[index]} data={item} onChange={handleChange} />;
  });

  return (
    <>
      <Wizard title={titles[sectionIndex]} content={data[sectionIndex]} sectionIndex={sectionIndex} isLastPage={sectionIndex === data.length - ONE} onPrev={onPrev} onNext={onNext} />
      <div className="container--center">{<TableRenderer label={'Payload'} source={formData[sectionIndex]} />}</div>
    </>
  );
};
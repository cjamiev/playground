import React, { useState } from 'react';
import Button from 'components/button';
import DynamicForm, { hasError, updateData } from 'components/form/DynamicForm';
import Wizard from 'components/wizard';
import TableRenderer from '../TableRenderer';
import { sectionOne, sectionTwo, sectionThree } from './data';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const TestDynamicForm = () => {
  const [sectionIndex, setSectionIndex] = useState(ZERO);
  const [formData, setFormData] = useState([sectionOne, sectionTwo, sectionThree]);

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
  const data = [
    <DynamicForm data={formData[ZERO]} onChange={handleChange} />,
    <DynamicForm data={formData[ONE]} onChange={handleChange} />,
    <DynamicForm data={formData[TWO]} onChange={handleChange} />
  ];


  return (
    <>
      <Wizard title={titles[sectionIndex]} content={data[sectionIndex]} sectionIndex={sectionIndex} isLastPage={sectionIndex === data.length - ONE} onPrev={onPrev} onNext={onNext} />
      <div className="container--center">{TableRenderer('Form Payload', formData[sectionIndex])}</div>
    </>
  );
};

export default TestDynamicForm;

import React, { useState } from 'react';
import Button from 'components/button';
import DynamicForm, { hasError, updateData } from 'components/form/DynamicForm';
import Wizard from 'components/wizard';
import TableRenderer from '../TableRenderer';
import { sectionOne, sectionTwo } from './data';

const ZERO = 0;
const ONE = 1;

const TestDynamicForm = () => {
  const [sectionIndex, setSectionIndex] = useState(ONE);
  const [formData, setFormData] = useState([sectionOne, sectionTwo]);

  const onPrev = () => {
    setSectionIndex(s => s - ONE);
  };

  const onNext = () => {
    if(!hasError(formData[sectionIndex - ONE])) {
      setSectionIndex(s => s + ONE);
    }
  };

  const handleChange = (changedData) => {
    const updatedFields = updateData(formData[sectionIndex - ONE], changedData);
    const updatedFormData = formData.map((entry, index) => {
      if(index === sectionIndex - ONE) {
        return updatedFields;
      }

      return entry;
    });

    setFormData(updatedFormData);
  };

  const title = ['Section One', 'Section Two'].find((item, index) => index === sectionIndex - ONE);
  const data = [
    <DynamicForm data={formData[ZERO]} onChange={handleChange} />,
    <DynamicForm data={formData[ONE]} onChange={handleChange} />
  ];


  return (
    <>
      <Wizard title={title} data={data} sectionIndex={sectionIndex} onPrev={onPrev} onNext={onNext} />
      <div className="container--center">{TableRenderer('Form Payload', formData[sectionIndex - ONE])}</div>
    </>
  );
};

export default TestDynamicForm;

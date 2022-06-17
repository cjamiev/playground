import React, { useState } from 'react';
import DynamicForm, { hasError, updateData } from 'components/atoms/Form/DynamicForm';
import WizardSection from './WizardSection';
import { noop } from 'utils/noop';

const ZERO = 0;
const ONE = 1;

const DynamicWizard = ({ sectionTitles, data, onSubmit = noop }) => {
  const [sectionIndex, setSectionIndex] = useState(ZERO);
  const [formData, setFormData] = useState(data);

  const onPrev = () => {
    setSectionIndex((s) => s - ONE);
  };

  const onNext = () => {
    if (!hasError(formData[sectionIndex])) {
      setSectionIndex((s) => s + ONE);
    }
  };

  const handleChange = (changedData) => {
    const updatedFields = updateData(formData[sectionIndex], changedData);
    const updatedFormData = formData.map((entry, index) => {
      if (index === sectionIndex) {
        return updatedFields;
      }

      return entry;
    });

    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isLastPage = sectionIndex === data.length - ONE;
  const prevButton =
    sectionIndex > ZERO ? { label: 'Previous', classProps: { classColor: 'secondary' }, action: onPrev } : {};
  const nextButton = isLastPage ? {} : { label: 'Next', classProps: { classColor: 'primary' }, action: onNext };
  const submitButton = isLastPage
    ? { label: 'Submit', classProps: { classColor: 'primary' }, action: handleSubmit }
    : {};
  const buttonList = [prevButton, nextButton, submitButton];

  const title = sectionTitles[sectionIndex];
  const content = <DynamicForm data={formData[sectionIndex]} onChange={handleChange} />;

  return <WizardSection title={title} content={content} buttonList={buttonList} />;
};

export default DynamicWizard;

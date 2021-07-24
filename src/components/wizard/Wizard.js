import React, { useState } from 'react';
import Button from 'components/button';
import Modal from 'components/modal';

const ONE = 1;

const Wizard = ({ title, data, hasError, onSubmit }) => {
  const [sectionIndex, setSectionIndex] = useState(ONE);
  const lastPageIndex = data.length;
  const currentPageContent = data[sectionIndex - ONE];

  const incrementSection = () => {
    if(!hasError) {
      setSectionIndex(s => s + ONE);
    }
  };

  const decrementSection = () => {
    setSectionIndex(s => s - ONE);
  };

  const prevButton = sectionIndex > ONE ? { label: 'Previous', classProps: { classColor: 'secondary' }, action: decrementSection } : {};
  const nextButton = sectionIndex < lastPageIndex ? { label: 'Next', classProps: { classColor: 'primary' }, action: incrementSection } : {};
  const submitButton = sectionIndex === lastPageIndex ? { label: 'Submit', classProps: { classColor: 'primary' }, action: onSubmit } : {};
  const buttonList = [
    prevButton,
    nextButton,
    submitButton
  ];

  return (
    <Modal title={title} message={currentPageContent} buttonList={buttonList} />
  );
};

export default Wizard;
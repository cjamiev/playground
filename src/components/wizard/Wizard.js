import React, { useState } from 'react';
import Button from 'components/button';
import Modal from 'components/modal';
import { noop } from 'helper/noop';

const ONE = 1;

const Wizard = ({ title, data, sectionIndex, onPrev = noop, onNext = noop, onSubmit = noop }) => {
  const lastPageIndex = data.length;
  const currentPageContent = data[sectionIndex - ONE];

  const prevButton = sectionIndex > ONE ? { label: 'Previous', classProps: { classColor: 'secondary' }, action: onPrev } : {};
  const nextButton = sectionIndex < lastPageIndex ? { label: 'Next', classProps: { classColor: 'primary' }, action: onNext } : {};
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
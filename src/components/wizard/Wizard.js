import React, { useState } from 'react';
import Button from 'components/button';
import Modal from 'components/modal';
import { noop } from 'helper/noop';

const ZERO = 0;

const Wizard = ({ title, content, sectionIndex = ZERO, isLastPage = false, onPrev = noop, onNext = noop, onSubmit = noop }) => {
  const prevButton = sectionIndex > ZERO ? { label: 'Previous', classProps: { classColor: 'secondary' }, action: onPrev } : {};
  const nextButton = isLastPage ? {} : { label: 'Next', classProps: { classColor: 'primary' }, action: onNext };
  const submitButton = isLastPage ? { label: 'Submit', classProps: { classColor: 'primary' }, action: onSubmit } : {};
  const buttonList = [
    prevButton,
    nextButton,
    submitButton
  ];

  return (
    <Modal title={title} message={content} buttonList={buttonList} />
  );
};

export default Wizard;
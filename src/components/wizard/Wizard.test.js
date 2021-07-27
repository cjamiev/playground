import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import { Wizard } from './Wizard';

const pageOneProps = {
  title: 'test-title-page1',
  content: 'content1',
  sectionIndex: 0,
  isLastPage: false,
  onPrev: jest.fn(),
  onNext: jest.fn(),
  onSubmit: jest.fn()
};

const pageTwoProps = {
  title: 'test-title-page2',
  content: 'content2',
  sectionIndex: 1,
  isLastPage: false,
  onPrev: jest.fn(),
  onNext: jest.fn(),
  onSubmit: jest.fn()
};

const pageThreeProps = {
  title: 'test-title-page3',
  content: 'content3',
  sectionIndex: 2,
  isLastPage: true,
  onPrev: jest.fn(),
  onNext: jest.fn(),
  onSubmit: jest.fn()
};

describe('Wizard', () => {
  it('checks page one behavior', () => {
    reduxTestWrapper(Wizard, pageOneProps);

    expect(screen.getByText(pageOneProps.content)).toBeInTheDocument();
    expect(screen.getByText(pageOneProps.title)).toBeInTheDocument();
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(pageOneProps.onNext).toHaveBeenCalled();
  });

  it('checks page two behavior', () => {
    reduxTestWrapper(Wizard, pageTwoProps);

    expect(screen.getByText(pageTwoProps.content)).toBeInTheDocument();
    expect(screen.getByText(pageTwoProps.title)).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(pageTwoProps.onPrev).toHaveBeenCalled();
    expect(pageTwoProps.onNext).toHaveBeenCalled();
  });

  it('checks page three behavior', () => {
    reduxTestWrapper(Wizard, pageThreeProps);

    expect(screen.getByText(pageThreeProps.content)).toBeInTheDocument();
    expect(screen.getByText(pageThreeProps.title)).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(pageThreeProps.onPrev).toHaveBeenCalled();
    expect(pageThreeProps.onSubmit).toHaveBeenCalled();
  });
});
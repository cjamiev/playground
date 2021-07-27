import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import DynamicWizard from './DynamicWizard';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const defaultProps = {
  sectionTitles: ['section1','section2','section3'],
  data: [
    [
      {
        id: 1,
        type: 'text',
        label: 'Text1',
        regex: '[0-9]+',
        errorMessage: 'Please enter a valid number',
        orderSeq: 1
      }
    ],
    [
      {
        id: 1,
        type: 'text',
        label: 'Text2',
        required: true,
        orderSeq: 1
      }
    ],
    [
      {
        id: 1,
        type: 'text',
        label: 'Text3',
        orderSeq: 1
      }
    ]
  ],
  onSubmit: jest.fn()
};

describe('DynamicWizard', () => {
  it('checks behavior', () => {
    reduxTestWrapper(DynamicWizard, defaultProps);

    expect(screen.getByText(defaultProps.sectionTitles[ZERO])).toBeInTheDocument();
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText(defaultProps.sectionTitles[ONE])).toBeInTheDocument();
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(screen.getByText(defaultProps.sectionTitles[ZERO])).toBeInTheDocument();
    const input = screen.getByLabelText('text-field');
    fireEvent.change(input, { target: { value: 'abc' } });

    expect(screen.getByText('Please enter a valid number')).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText(defaultProps.sectionTitles[ZERO])).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '123' } });
    expect(screen.queryByText('Please enter a valid number')).not.toBeInTheDocument();
    fireEvent.click(nextButton);

    expect(screen.getByText(defaultProps.sectionTitles[ONE])).toBeInTheDocument();

    const inputSectionTwo = screen.getByLabelText('text-field');
    fireEvent.change(inputSectionTwo, { target: { value: 'abc' } });
    fireEvent.click(nextButton);


    expect(screen.getByText(defaultProps.sectionTitles[TWO])).toBeInTheDocument();

    const inputSectionThree = screen.getByLabelText('text-field');
    fireEvent.change(inputSectionThree, { target: { value: '123' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });
});
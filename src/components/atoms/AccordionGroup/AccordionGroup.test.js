import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import { AccordionGroup } from './AccordionGroup';

const ZERO = 0;
const ONE = 1;
const defaultProps = {
  data: [
    { label: 'test-label1', content: <div>{'test-content1'}</div> },
    { label: 'test-label2', content: <div>{'test-content2'}</div> }
  ]
};

describe('AccordionGroup', () => {
  it('checks behavior', () => {
    simpleTestWrapper(AccordionGroup, defaultProps);

    expect(screen.queryByText('test-content1')).not.toBeInTheDocument();
    expect(screen.queryByText('test-content2')).not.toBeInTheDocument();

    const accordionOneLabel = screen.getByText(defaultProps.data[ZERO].label);
    fireEvent.click(accordionOneLabel);

    expect(screen.queryByText('test-content1')).toBeInTheDocument();
    expect(screen.queryByText('test-content2')).not.toBeInTheDocument();

    const accordionTwoLabel = screen.getByText(defaultProps.data[ONE].label);
    fireEvent.click(accordionTwoLabel);

    expect(screen.queryByText('test-content1')).not.toBeInTheDocument();
    expect(screen.queryByText('test-content2')).toBeInTheDocument();
  });
});

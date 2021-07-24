import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Accordion from './Accordion';

const defaultProps = {
  label: 'test-label',
  content: <div>content</div>
};

describe('Accordion', () => {
  it('checks accordion behavior', () => {
    simpleTestWrapper(Accordion, defaultProps);

    expect(screen.queryByText('content')).not.toBeInTheDocument();

    const accordionLabel = screen.getByText(defaultProps.label);
    fireEvent.click(accordionLabel);

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
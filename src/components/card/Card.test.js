import React from 'react';
import { screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Card from './Card';

const defaultProps = {
  content: <div>content</div>
};

describe('Card', () => {
  it('checks behavior', () => {
    simpleTestWrapper(Card, defaultProps);

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

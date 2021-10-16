import React from 'react';
import { screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Card from './Card';

const defaultProps = {
  children: <div>content</div>
};

describe('Card', () => {
  it('checks behavior', () => {
    simpleTestWrapper(Card, defaultProps);

    expect(screen.queryByText('content')).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import StyleGuide from './StyleGuide';

const pathname = '/styleguide';
const ZERO = 0;

describe('StyleGuide', () => {
  it('checks page renders', () => {
    reduxTestWrapper(StyleGuide, {}, {}, pathname);

    expect(screen.getAllByText('Style Guide')[ZERO]).toBeInTheDocument();
  });
});
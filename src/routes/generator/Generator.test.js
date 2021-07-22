import { screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Generator from './Generator';

const pathname = '/generator';
const ZERO = 0;

describe('Generator', () => {
  it('checks page renders', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    expect(screen.getAllByText('Generator')[ZERO]).toBeInTheDocument();
  });
});
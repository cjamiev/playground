import { screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Home from './Home';

const pathname = '/home';
const ZERO = 0;

describe('Home', () => {
  it('checks page renders', () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    expect(screen.getAllByText('Home')[ZERO]).toBeInTheDocument();
  });
});
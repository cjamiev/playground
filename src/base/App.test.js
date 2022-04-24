import { screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import App from './index';

const ZERO = 0;

describe('App', () => {
  it('checks page renders', () => {
    simpleTestWrapper(App);

    expect(screen.queryAllByText('Home')[ZERO]).toBeInTheDocument();
  });
});

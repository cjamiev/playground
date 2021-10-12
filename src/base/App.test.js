import { screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import App from './index';

const ZERO = 0;

describe('App', () => {
  it('checks page renders', () => {
    reduxTestWrapper(App);

    expect(screen.queryAllByText('Home')[ZERO]).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import Home from './Home';

describe('Home', () => {
  it('checks page renders', () => {
    testRenderContainer(Home);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
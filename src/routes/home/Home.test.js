import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import Home from './Home';

const pathname = '/home';

describe('Home', () => {
  it('checks page renders', () => {
    testRenderContainer(Home, {}, {}, pathname);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
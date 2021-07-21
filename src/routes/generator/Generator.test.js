import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import Generator from './Generator';

const pathname = '/generator';

describe('Generator', () => {
  it('checks page renders', () => {
    testRenderContainer(Generator, {}, {}, pathname);

    expect(screen.getByText('Generator')).toBeInTheDocument();
  });
});
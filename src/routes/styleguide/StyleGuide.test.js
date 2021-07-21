import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import StyleGuide from './StyleGuide';

const pathname = '/styleguide';

describe('StyleGuide', () => {
  it('checks page renders', () => {
    testRenderContainer(StyleGuide, {}, {}, pathname);

    expect(screen.getByText('Style Guide')).toBeInTheDocument();
  });
});
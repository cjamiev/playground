import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import StyleGuide from './StyleGuide';

const defaultProps = {};

describe('StyleGuide', () => {
  it('checks page renders', () => {
    testRenderComponent(StyleGuide, defaultProps);

    expect(screen.getByText('CSS Style Guide')).toBeInTheDocument();
  });
});
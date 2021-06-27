import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import Home from './Home';

const defaultProps = {};

describe('Home', () => {
  it('checks page renders', () => {
    testRenderComponent(Home, defaultProps);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import StyleGuide from './StyleGuide';

const defaultProps = {};

describe('StyleGuide', () => {
  it('checks dropdown behavior', () => {
    testRenderComponent(StyleGuide, defaultProps);

    const dropdownBtn = screen.getByText('Dropdown');

    expect(screen.queryByText('Item1')).not.toBeInTheDocument();
    fireEvent.click(dropdownBtn);
    expect(screen.getByText('Item1')).toBeInTheDocument();
  });
});
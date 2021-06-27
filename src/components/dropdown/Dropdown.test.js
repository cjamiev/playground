import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import Dropdown from './Dropdown';

const ZERO = 0;
const defaultProps = {
  label:'Dropdown',
  data: [{ value:'item1'}, { value:'item2'}]
};

describe('Dropdown', () => {
  it('checks dropdown behavior', () => {
    testRenderComponent(Dropdown, defaultProps);

    const dropdownBtn = screen.getByText('Dropdown');

    expect(screen.queryByText(defaultProps.data[ZERO].value)).not.toBeInTheDocument();
    fireEvent.click(dropdownBtn);
    expect(screen.getByText(defaultProps.data[ZERO].value)).toBeInTheDocument();
  });
});
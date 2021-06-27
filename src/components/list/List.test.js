import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import List from './List';

const ZERO = 0;
const defaultProps = {
  header: 'List',
  data: [[{ type: 'link', label: 'Google', value: 'www.google.com'}]]
};

describe('List', () => {
  it('checks dropdown behavior', () => {
    testRenderComponent(List, defaultProps);

    expect(screen.getByText(defaultProps.data[ZERO][ZERO].label)).toBeInTheDocument();
  });
});
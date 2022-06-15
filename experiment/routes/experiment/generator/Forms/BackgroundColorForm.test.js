import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BackgroundColorForm from './BackgroundColorForm';

const ZERO = 0;
const ONE = 1;
const defaultProps = {
  style: {},
  onChange: jest.fn()
};

describe.skip('BackgroundColorForm', () => {
  it('update background color', () => {
    simpleTestWrapper(BackgroundColorForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Background Color color field'), { target: { value: '#555555' } });
    fireEvent.change(screen.getByLabelText('Opacity range field'), { target: { value: '50' } });
    fireEvent.click(screen.getByText('Remove'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'backgroundColor', selected: '#555555' }],
      [{ id: 'backgroundColorOpacity', selected: '50' }],
      [{ id: 'backgroundColor', selected: '' }]
    ]);
  });
});

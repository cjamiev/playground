import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BorderForm from './BorderForm';

const defaultProps = {
  style: {},
  onChange: jest.fn()
};

describe.skip('BorderForm', () => {
  it('update border', () => {
    simpleTestWrapper(BorderForm, defaultProps);

    fireEvent.click(screen.getByText('Border Type'));
    fireEvent.click(screen.getByText('solid'));
    fireEvent.change(screen.getByLabelText('Thickness range field'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Color color field'), { target: { value: '#555555' } });
    fireEvent.click(screen.getByText('Remove'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [
        {
          id: 'borderStyle',
          values: [
            { label: 'solid', selected: true },
            { label: 'dotted', selected: false },
            { label: 'dashed', selected: false },
            { label: 'double', selected: false },
            { label: 'groove', selected: false },
            { label: 'ridge', selected: false },
            { label: 'inset', selected: false },
            { label: 'outset', selected: false },
            { label: 'none', selected: false }
          ]
        }
      ],
      [{ id: 'borderThickness', selected: '1' }],
      [{ id: 'borderColor', selected: '#555555' }],
      [{ id: 'borderStyle', selected: '' }],
      [{ id: 'borderThickness', selected: '' }],
      [{ id: 'borderColor', selected: '' }]
    ]);
  });

  it('update border radius', () => {
    simpleTestWrapper(BorderForm, defaultProps);

    fireEvent.click(screen.getByText('No'));
    fireEvent.change(screen.getByLabelText('Top Left range field'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Top Right range field'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Bottom Right range field'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Bottom Left range field'), { target: { value: '4' } });

    fireEvent.click(screen.getByText('Yes'));
    fireEvent.change(screen.getByLabelText('Radius range field'), { target: { value: '5' } });

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'topLeftRadius', selected: '' }],
      [{ id: 'topRightRadius', selected: '' }],
      [{ id: 'bottomRightRadius', selected: '' }],
      [{ id: 'bottomLeftRadius', selected: '' }],
      [{ id: 'borderRadius', selected: '' }],
      [{ id: 'topLeftRadius', selected: '1' }],
      [{ id: 'topRightRadius', selected: '2' }],
      [{ id: 'bottomRightRadius', selected: '3' }],
      [{ id: 'bottomLeftRadius', selected: '4' }],
      [{ id: 'topLeftRadius', selected: '' }],
      [{ id: 'topRightRadius', selected: '' }],
      [{ id: 'bottomRightRadius', selected: '' }],
      [{ id: 'bottomLeftRadius', selected: '' }],
      [{ id: 'borderRadius', selected: '5' }]
    ]);
  });
});

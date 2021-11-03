import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import GeneratorForm from './GeneratorForm';

const generatorFormProps = {
  style: {
    borderStyle: 'solid',
    textAlign: 'left',
    transitionTimingFunction: 'linear'
  },
  onChange: jest.fn()
};

describe('GeneratorForm', () => {
  it('renders selection', () => {
    simpleTestWrapper(GeneratorForm, generatorFormProps);

    const attributeDropdown = screen.getByText('Select CSS Attributes');

    fireEvent.click(attributeDropdown);
    fireEvent.click(screen.getByText('Border'));
    expect(screen.queryByText(`Border Type ${generatorFormProps.style.borderStyle}`)).toBeInTheDocument();

    fireEvent.click(attributeDropdown);
    fireEvent.click(screen.getByText('Text'));
    expect(screen.queryByText(`Text Align ${generatorFormProps.style.textAlign}`)).toBeInTheDocument();

    fireEvent.click(attributeDropdown);
    fireEvent.click(screen.getByText('Transition'));
    expect(
      screen.queryByText(`Transition Timing Function ${generatorFormProps.style.transitionTimingFunction}`)
    ).toBeInTheDocument();
  });
});

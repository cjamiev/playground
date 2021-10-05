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

    const borderLabel = screen.getByText('Border');
    fireEvent.click(borderLabel);
    expect(screen.getByText(`Border Type ${generatorFormProps.style.borderStyle}`)).toBeInTheDocument();

    const textLabel = screen.getByText('Text');
    fireEvent.click(textLabel);
    expect(screen.getByText(`Text Align ${generatorFormProps.style.textAlign}`)).toBeInTheDocument();

    const transitionLabel = screen.getByText('Transition');
    fireEvent.click(transitionLabel);
    expect(
      screen.getByText(`Transition Timing Function ${generatorFormProps.style.transitionTimingFunction}`)
    ).toBeInTheDocument();
  });
});

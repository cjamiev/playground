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

describe.skip('GeneratorForm', () => {
  it('renders selection', () => {
    simpleTestWrapper(GeneratorForm, generatorFormProps);

    fireEvent.click(screen.getByText('Border'));
    expect(screen.queryByText(`Border Type ${generatorFormProps.style.borderStyle}`)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Font'));
    expect(screen.queryByText(`Alignment ${generatorFormProps.style.textAlign}`)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Transition'));
    expect(screen.queryByText('Timing Function')).toBeInTheDocument();
  });
});

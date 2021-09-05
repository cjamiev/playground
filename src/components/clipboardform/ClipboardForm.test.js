import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import ClipboardForm from './ClipboardForm';

const pathname = '/home';
const ZERO = 0;
const ONE = 1;
const TWO = 2;
document.execCommand = jest.fn();

describe('ClipboardForm', () => {
  it('handle form', () => {
    simpleTestWrapper(ClipboardForm, {});
    fireEvent.change(screen.getByLabelText('Key text field'), { target: { value: 'test-key' } });
    fireEvent.change(screen.getByLabelText('Title text field'), { target: { value: 'test-title' } });

    fireEvent.change(screen.getByLabelText('Name text field'), { target: { value: 'test-name' } });
    fireEvent.change(screen.getByLabelText('Value text field'), { target: { value: 'test-value' } });
    fireEvent.click(screen.getByText('Save'));

    fireEvent.click(screen.getByText('Type copy'));
    fireEvent.click(screen.getByText('timer'));
    fireEvent.change(screen.getByLabelText('Name text field'), { target: { value: 'test-name2' } });
    fireEvent.click(screen.getByText('Save'));

    fireEvent.click(screen.getByText('Type timer'));
    fireEvent.click(screen.getByText('text'));
    fireEvent.change(screen.getByLabelText('Name text field'), { target: { value: 'test-name3' } });
    fireEvent.change(screen.getByLabelText('Value text field'), { target: { value: 'test-value3' } });
    fireEvent.click(screen.getByText('Save'));

    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByText('test-value3'));

    fireEvent.click(screen.getAllByText('Up')[TWO]);
    fireEvent.click(screen.getAllByText('Down')[ZERO]);
    fireEvent.click(screen.getAllByText('Remove')[ZERO]);
    fireEvent.click(screen.getByText('Update'));

    expect(screen.getByText('test-title')).toBeInTheDocument();
    expect(screen.getByText('test-name')).toBeInTheDocument();
    expect(screen.getByText('test-name2')).toBeInTheDocument();
    expect(screen.queryByText('test-value3')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('test-name'));
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('test-name')).not.toBeInTheDocument();
    expect(screen.queryByText('test-name2')).not.toBeInTheDocument();
  });
});
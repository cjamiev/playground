import api from 'api';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import ClipboardForm from './ClipboardForm';

jest.mock('api');
const mockPost = jest.fn();
mockPost.mockResolvedValue({
  data: {
    data: {
      message: 'successful'
    }
  }
});
api.post = mockPost;
document.execCommand = jest.fn();
const pathname = '/home';
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const clipboard = {
  keyOne: [
    { title: 'test-title', data: [[{ type: 'copy', label: 'copy1', value: 'value1' }]] }
  ],
  keyTwo: [
    { title: 'test-title2', data: [[{ type: 'copy', label: 'copy2', value: 'value2' }]] }
  ]
};

describe('ClipboardForm', () => {
  it('handle form', () => {
    reduxTestWrapper(ClipboardForm, { clipboard: {} });
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

    fireEvent.click(screen.getAllByLabelText('up arrow')[TWO]);
    fireEvent.click(screen.getAllByLabelText('down arrow')[ZERO]);
    fireEvent.click(screen.getAllByLabelText('trash')[ZERO]);
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

  it('handle existing data', () => {
    reduxTestWrapper(ClipboardForm, { clipboard });
    fireEvent.click(screen.getByText('Existing Key'));
    fireEvent.click(screen.getByText('keyOne'));
    fireEvent.click(screen.getByText('Existing Title'));
    fireEvent.click(screen.getByText('test-title'));

    expect(screen.getByText('test-title')).toBeInTheDocument();
    expect(screen.getByText('copy1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Existing Key keyOne'));
    fireEvent.click(screen.getByText('keyTwo'));
    fireEvent.click(screen.getByText('Existing Title'));
    fireEvent.click(screen.getByText('test-title2'));

    expect(screen.getByText('test-title2')).toBeInTheDocument();
    expect(screen.getByText('copy2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit'));
    expect(api.post).toHaveBeenCalledWith('/db', { filename: 'clipboard.json', content: JSON.stringify(clipboard) });
  });
});
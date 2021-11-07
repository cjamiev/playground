import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Snippet from './Snippet';

const defaultStoreProps = {
  project: {
    snippets: ['snippetOne', 'snippetTwo'],
    snippetFile: ''
  }
};

describe('Snippet', () => {
  it('should render', () => {
    reduxTestWrapper(Snippet, {}, defaultStoreProps);

    expect(screen.queryByText('snippetOne')).toBeInTheDocument();
    expect(screen.queryByText('snippetTwo')).toBeInTheDocument();
  });
});

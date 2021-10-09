import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Git from './Git';

const defaultStoreProps = {
  git: {
    data: 'test123'
  }
};

describe('Git', () => {
  it('should render', () => {
    reduxTestWrapper(Git, {}, defaultStoreProps);

    expect(screen.getByText('git')).toBeInTheDocument();
  });
});

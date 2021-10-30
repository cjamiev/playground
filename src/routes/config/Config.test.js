import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Config from './Config';

const defaultStoreProps = {
  config: {
    data: 'test123'
  }
};

describe('Config', () => {
  it('should render', () => {
    reduxTestWrapper(Config, {}, defaultStoreProps);

    expect(screen.queryByText('config')).toBeInTheDocument();
  });
});

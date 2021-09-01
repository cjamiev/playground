import api from 'api';
import { screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Home from './Home';

const pathname = '/home';

describe('Home', () => {
  it('renders page', () => {
    reduxTestWrapper(Home, {}, {}, pathname);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
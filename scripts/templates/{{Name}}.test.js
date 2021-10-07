import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import {{Name}} from './{{Name}}';

describe('{{Name}}', () => {
  it('handle tasks', () => {
    reduxTestWrapper({{Name}});

    expect(screen.getByText('{{name}}')).toBeInTheDocument();
  });
});

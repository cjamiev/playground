import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import {{Name}} from './{{Name}}';

const defaultStoreProps = {
  {{name}}: {
    data: 'test123'
  }
};

describe('{{Name}}', () => {
  it('should render', () => {
    reduxTestWrapper({{Name}}, {}, defaultStoreProps);

    expect(screen.getByText('{{name}}')).toBeInTheDocument();
  });
});

import React from 'react';
import Button from 'components/button';
import { useHistory } from 'react-router-dom';

const ErrorPage = React.memo(() => {
  const history = useHistory();

  return (
    <div>
      <h1>404 Page Not Found</h1>
      <Button label='Go back to previous page' classColor="primary" onClick={history.goBack} />
    </div>
  );
});

export default ErrorPage;

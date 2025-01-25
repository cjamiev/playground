import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../layout/Page';
import Button from '../../atoms/Button';

const PREVIOUS_INDEX = -1;

const ErrorPage = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Page>
      <Button
        label="Go back to previous page"
        isPrimary
        onClick={() => {
          navigate(PREVIOUS_INDEX);
        }}
      />
    </Page>
  );
});

export default ErrorPage;

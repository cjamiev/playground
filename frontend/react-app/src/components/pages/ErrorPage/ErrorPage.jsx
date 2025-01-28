import { useNavigate } from 'react-router-dom';
import Page from '../../layout/Page';

const PREVIOUS_INDEX = -1;

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <button
        onClick={() => {
          navigate(PREVIOUS_INDEX);
        }}
      >
        Go back to previous page
      </button>
    </Page>
  );
};

export default ErrorPage;

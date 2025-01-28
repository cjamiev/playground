import Alert from './Alert';
import { SCPageHeader, SCPageHeaderTitle } from './styles';

const PageHeader = ({ title }) => {
  return (
    <SCPageHeader>
      <SCPageHeaderTitle>{title}</SCPageHeaderTitle>
      <Alert />
    </SCPageHeader>
  );
};

export default PageHeader;

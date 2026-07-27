import {
  useEffect,
  useState,
} from 'react';
import { useThemeContext } from '../../../context/ThemeProvider';
import Page from '../../layout/Page';
import Dropdown from '../../atoms/Dropdown';
import {
  SCButtonList,
  SCDropdownWrapper,
  SCDisplayCode,
  SCContentWrapper,
  SCSectionWrapper,
  SCExampleWrapper,
  SCNotesWrapper
} from './styles';

const conceptList = ['Test'];
const CssPage = () => {
  const [concept, setConcept] = useState(conceptList[0]);
  const { isLightMode } = useThemeContext();

  return (
    <Page>
      <SCDropdownWrapper>
        <Dropdown label='Select Concept' content={<SCButtonList>
          {conceptList.map(item => {
            return <button key={item} onClick={() => setConcept(item)}>{item}</button>
          })}
        </SCButtonList>} />
        <h2>{concept}</h2>
      </SCDropdownWrapper>
      <SCContentWrapper>
        <SCSectionWrapper>
          <SCExampleWrapper $islightmode={isLightMode}>
            {concept === conceptList[0] && <div>
              <h2>Test Example</h2>
            </div>}
          </SCExampleWrapper>
        </SCSectionWrapper>
        <SCDisplayCode>
          {concept === conceptList[0] && <div>Test</div>}
        </SCDisplayCode>
      </SCContentWrapper>
    </Page >
  );
};

export default CssPage;

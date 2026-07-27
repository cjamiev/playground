import {
  useEffect,
  useState,
} from 'react';
import { useThemeContext } from '../../../context/ThemeProvider';
import Page from '../../layout/Page';
import { useWebWorker } from '../../../hooks/useWebWorker';
import Dropdown from '../../atoms/Dropdown';
import {
  DisplayApiExample
} from './ApiExample';
import {
  DisplayEventExample
} from './EventExample';
import {
  SCButtonList,
  SCDropdownWrapper,
  SCDisplayCode,
  SCContentWrapper,
  SCSectionWrapper,
  SCExampleWrapper,
  SCNotesWrapper
} from './styles';


const dictionaryURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const FetchComponent = () => {
  const [word, setWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState([]);

  const onHandleWordChange = (event) => {
    setWord(event.target.value);
  };

  const onSubmit = () => {
    setIsLoading(true);
    fetch(dictionaryURL + word)
      .then(response => response.json())
      .then(response => setDefinition(response
        .map(i => i.meanings)
        .map(entry =>
          entry.map(item =>
            item.definitions.map(i => i.definition)))
        .reduce((curr, accum) => {
          return [...curr, ...accum]
        }, [])
        .reduce((curr, accum) => {
          return [...curr, ...accum]
        }, [])))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClear = () => {
    setDefinition([]);
  };

  return (
    <>
      <div>
        <input
          type='text'
          placeholder='Enter Word'
          onChange={(event) => {
            onHandleWordChange(event);
          }}
          value={word}
        />
        <button onClick={onSubmit}> Submit </button>
        <button onClick={onClear}> clear </button>
        {isLoading ? <div>Loading</div> : <div>{definition.map((d, i) => { return <div key={i}>{d}</div> })}</div>}
      </div>
    </>
  );
};

const useMouseClick = () => {
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const getCoordinates = (event) => {
      setCoordinates({ x: event.clientX, y: event.clientY });
    };

    addEventListener('mousedown', getCoordinates);

    return () => {
      removeEventListener('mousedown', getCoordinates);
    };
  }, []);

  return coordinates;
};

const EventComponent = () => {
  const { x, y } = useMouseClick();

  return (
    <div>
      <span>Click Location: {'{'}{x},{y}{'}'}</span>
    </div>
  );
};

const WebWorkerComponent = () => {
  const [numberToCheck, setNumberToCheck] = useState(0);
  function workerFunction() {
    this.onmessage = function (e) {
      const n = Number(e.data);
      let isPrime = n % 2 === 0 ? false : true;
      let divisor = !isPrime ? 2 : 1;
      if (n > 2 && isPrime) {
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
          if (n % i === 0) {
            divisor = i;
            isPrime = false;
            break;
          }
        }
      }
      if (n < 2) {
        this.postMessage(`${n} is NOT prime as it is less than 2 which is not part of definition`)
      } else {
        this.postMessage(`${n} ${isPrime ? 'is prime' : `NOT prime as it is divisble by ${divisor}`}`)
      }
    }
  }
  const { result, error, isLoading } = useWebWorker(workerFunction, numberToCheck);

  const onHandleChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setNumberToCheck(value)
    } else {
      setNumberToCheck(0);
    }
  }

  return (
    <div>
      <label>Enter Number</label>
      <input onChange={(e) => onHandleChange(e)} value={numberToCheck} />
      {isLoading ?
        <div>Is Loading...</div> :
        <div>
          <span>{result}</span>
          <span>{error}</span>
        </div>}
    </div>
  );
};

const conceptList = ['Fetch', 'Events', 'Web Workers'];
const JsPage = () => {
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
              <h2>API Example</h2>
              <FetchComponent />
            </div>}
            {concept === conceptList[1] && <div>
              <h2>Event Handling Example</h2>
              <EventComponent />
            </div>}
            {concept === conceptList[2] && <div>
              <h2>Web Worker Example</h2>
              <WebWorkerComponent />
            </div>}
          </SCExampleWrapper>
        </SCSectionWrapper>
        <SCDisplayCode>
          {concept === conceptList[0] && <DisplayApiExample />}
          {concept === conceptList[1] && <DisplayEventExample />}
        </SCDisplayCode>
      </SCContentWrapper>
    </Page >
  );
};

export default JsPage;

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useMemo,
  useRef,
  useTransition,
} from "react";
import { useThemeContext } from '../../../context/ThemeProvider';
import Page from '../../layout/Page';
import './interview.css'
import { useWebWorker } from '../../../hooks/useWebWorker';

const CountContext = createContext({
  count: 0,
  increment: () => { },
  decrement: () => { },
});
const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const increment = () => { setCount(c => c + 1) };
  const decrement = () => { setCount(c => c - 1) };
  const countValue = { count, increment, decrement };

  return (
    <CountContext.Provider value={countValue}>
      {children}
    </CountContext.Provider>
  );
};
const CountCTXComponent = () => {
  const { count, increment, decrement } = useContext(CountContext);

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const simpleReducer = (
  state,
  action
) => {
  switch (action.type) {
    case "ADD":
      return state.concat(action.payload);
    case "DELETE":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};
const SimpleCrudComponent = () => {
  const [list, dispatch] = useReducer(simpleReducer, []);
  const [name, setName] = useState("");

  const onHandleNameChange = (event) => {
    setName(event.target.value);
  };

  const addToList = () => {
    dispatch({
      type: "ADD",
      payload: {
        id: list.length,
        name
      },
    });
    setName("");
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(event) => {
            onHandleNameChange(event);
          }}
          value={name}
        />
        <button onClick={addToList}>Submit</button>
      </div>
      {list
        .map((item) => {
          return (
            <div key={item.id}>
              <span>Name:{item.name}</span>
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
};

const dictionaryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const FetchComponent = () => {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState([]);

  const onHandleWordChange = (event) => {
    setWord(event.target.value);
  };

  const onSubmit = () => {
    setIsLoading(true);
    fetch(dictionaryURL + word)
      .then((response) => response.json())
      .then((response) => setDefinition(response
        .map(i => i.meanings)
        .map(entry => entry.map(item => item.definitions.map(i => i.definition)))
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
          type="text"
          placeholder="Enter Word"
          onChange={(event) => {
            onHandleWordChange(event);
          }}
          value={word}
        />
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onClear}>clear</button>
        {isLoading ? <div>Loading</div> : <div>{definition.map((d, i) => { return <div key={i}>{d}</div> })}</div>}
      </div>
    </>
  );
};

const fruits = [
  "apple",
  "grape",
  "grapefruit",
  "jackfruit",
  "pineapple",
  "strawberry",
  "raspberry",
  "blueberry",
  "blackberry",
];
const useDebounceValue = (value, time) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    let timeOutId = 0;
    if (time) {
      timeOutId = setTimeout(() => {
        setDebouncedValue(value);
      }, time);
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [value, time]);

  return debouncedValue;
};
const DebounceComponent = () => {
  const [word, setWord] = useState("");
  const [list, setList] = useState(fruits);
  const debouncedValue = useDebounceValue(word, 250);

  const onHandleWordChange = (event) => {
    setWord(event.target.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      setList(fruits.filter((item) => item.includes(debouncedValue)));
    } else {
      setList(fruits);
    }
  }, [word, debouncedValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Fruit"
        onChange={(event) => {
          onHandleWordChange(event);
        }}
        value={word}
      />
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const ExpensiveSection = ({ children, trackingIndex }) => {
  const expensiveFunction = useMemo(() => {
    console.log("running expensive component:", trackingIndex);
    let sum = 0;
    for (let i = 0; i < 1e5; i++) {
      sum += i;
    }
    return sum;
  }, []);

  console.log("expensiveValue:", trackingIndex, expensiveFunction);
  return <>{children}</>;
};
const ExpensiveComponent = () => {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState([]);
  const inputRef = useRef(null);

  const onHandleEntryChange = (event) => {
    setNewItem(event.target.value);
  };

  const onSubmit = () => {
    if (!list.some((item) => item === newItem)) {
      setList(list.concat(newItem));
    }
    clearCurrent();
  };

  const onClear = () => {
    setList([]);
    clearCurrent();
  }

  const clearCurrent = () => {
    setNewItem('');
    inputRef.current.focus();
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter New Item"
        value={newItem}
        onChange={(event) => {
          onHandleEntryChange(event);
        }}
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            onSubmit();
          }
        }}
      />
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClear}>Clear</button>
      <div>
        {list.map((item, trackingIndex) => {
          return (
            <ExpensiveSection key={item} trackingIndex={trackingIndex}>
              <span>{item}</span>
              {trackingIndex < list.length - 1 && <span>, </span>}
            </ExpensiveSection>
          );
        })}
      </div>
    </div>
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

    addEventListener("mousedown", getCoordinates);

    return () => {
      removeEventListener("mousedown", getCoordinates);
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

const CleanupComponent = () => {
  const [timer, setTimer] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTimer(c => c + 1);
    }, 1000)

    return () => {
      clearInterval(timeoutId);
    }
  })

  return <div>
    {show && <span>{timer}</span>}
    <button onClick={() => setShow(!show)}>{show ? 'Hide Timer' : 'Show Timer'}</button>
  </div>
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

  return <div>
    <label>Enter Number</label>
    <input onChange={(e) => onHandleChange(e)} value={numberToCheck} />
    {isLoading ?
      <div>Is Loading...</div> :
      <div>
        <span>{result}</span>
        <span>{error}</span>
      </div>}
  </div>
};

const LIST_SIZE = 2000;
const TransitionComponent = () => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const onHandleChange = (e) => {
    setInput(e.target.value)
    startTransition(() => {
      const updatedList = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        updatedList.push(e.target.value);
      }
      setList(updatedList)
    })
  }

  return (<div>
    <input type="text" onChange={onHandleChange} value={input} />
    {isPending ? <div>Loading...</div> : <div>
      {list.map(item => <div key={item}>{item}</div>)}
    </div>}
  </div>)
};

const Interview = () => {
  const { isLightMode } = useThemeContext();
  const wrapperClassName = isLightMode ? 'wrapper' : 'wrapper dm-wrapper';

  return (
    <Page>
      <div style={{ display: 'flex' }}>
        <div className={wrapperClassName} >
          <div>
            <h2>Context Provider Example</h2>
            <CountProvider>
              <CountCTXComponent />
            </CountProvider>
          </div>
          <div>
            <h2>Reducer Example</h2>
            <SimpleCrudComponent />
          </div>
          <div>
            <h2>Custom Hook Example</h2>
            <DebounceComponent />
          </div>
          <div>
            <h2>Memo Example</h2>
            <ExpensiveComponent />
          </div>
          <div>
            <h2>Cleanup Example</h2>
            <CleanupComponent />
          </div>
          <div>
            <h2>API Example</h2>
            <FetchComponent />
          </div>
          <div>
            <h2>Event Handling Example</h2>
            <EventComponent />
          </div>
          <div>
            <h2>Webworker Example</h2>
            <WebWorkerComponent />
          </div>
          <div>
            <h2>Transition Example</h2>
            <TransitionComponent />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Interview;

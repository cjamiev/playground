import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useMemo,
  useRef,
  useTransition,
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
import {
  DisplayContextExample,
  DisplayProviderExample,
  DisplayUseContextExample
} from './ContextExample';
import {
  DisplayReducerFunctionExample,
  DisplayReducerExample
} from './ReducerExample';
import {
  DisplayHookExample
} from './HookExample';
import {
  DisplayMemoExample
} from './MemoExample';
import {
  DisplayTransitionExample
} from './TransitionExample';

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
      <span> Count: {count} </span>
      <button onClick={increment}> Increment </button>
      <button onClick={decrement}> Decrement </button>
    </div>
  );
};

const ContextNotes = ({ isLightMode }) => {
  return (<SCNotesWrapper $islightmode={isLightMode}>
    <div>
      Context is best used for state that rarely changes and is global. For example
      CSS Theme or User Session info. Use it to avoid prop drilling.
      Use Redux for more complicated apps with state that is constantly changing.
    </div>

    <div>
      Start with local state, then lift state up if parent components needs access.
      If you more than one non-sibling component has same state then consider using
      context.
    </div>

    <div>
      Remember if a component is not in the subtree of a context provider you will not receive
      the props and have no visible errors.
    </div>
  </SCNotesWrapper>)
}

const simpleReducer = (
  state,
  action
) => {
  switch (action.type) {
    case 'ADD':
      return state.concat(action.payload);
    case 'DELETE':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};

const SimpleCrudComponent = () => {
  const [list, dispatch] = useReducer(simpleReducer, []);
  const [name, setName] = useState('');

  const onHandleNameChange = (event) => {
    setName(event.target.value);
  };

  const addToList = () => {
    dispatch({
      type: 'ADD',
      payload: {
        id: list.length,
        name
      },
    });
    setName('');
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Enter Name'
          onChange={(event) => {
            onHandleNameChange(event);
          }}
          value={name}
        />
        <button onClick={addToList}> Submit </button>
      </div>
      {list
        .map(item => {
          return (
            <div key={item.id}>
              <span> Name: {item.name} </span>
              <button onClick={() => deleteTodo(item.id)}> Delete </button>
            </div>
          );
        })}
    </div>
  );
};

const ReducerNotes = ({ isLightMode }) => {
  return (<SCNotesWrapper $islightmode={isLightMode}>
    <div>
      useReducer(reducer, initialArg, init?)
    </div>
    <div>
      Reducer is ideal for when you have related variables that should be mutated together.
    </div>
    <div>
      Remember setState fires asynchronously so useReducer would be more efficient if you
      need to ensure that certain variables get updated at the same time.
    </div>
    <div>
      Do not mutate state directly in reducer function.  Instead return a new object.
    </div>
    <div>
      useReducer takes in three parameters: the pure reducer function that returns a new state,
      initialArgument on first render, and an optional initializer function. If you need a function
      that creates initial state that takes parameter use the third parameter (the second parameter
      becomes input for the third parameter's function).
    </div>
  </SCNotesWrapper>)
}

const fruits = [
  'apple',
  'grape',
  'grapefruit',
  'jackfruit',
  'pineapple',
  'strawberry',
  'raspberry',
  'blueberry',
  'blackberry',
];
const useDebounceValue = (value, time) => {
  const [debouncedValue, setDebouncedValue] = useState('');

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
  const [word, setWord] = useState('');
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
        type='text'
        placeholder='Enter Fruit'
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

const HookNotes = ({ isLightMode }) => {
  return (<SCNotesWrapper $islightmode={isLightMode}>
    <div>
      Hooks are used to separate stateful logic from a component.
    </div>
    <div>
      Rules of Hooks:
      <ul>
        <li>
          hooks must be top level (order must be same)
        </li>
        <li>
          note hooks cannot be wrapped inside of an conditions/loops
        </li>
        <li>
          must be from react functions or custom hooks
        </li>
        <li>
          convention is to start with the word 'use'
        </li>
      </ul>
    </div>
  </SCNotesWrapper>)
}

const ExpensiveSection = ({ children, trackingIndex }) => {
  const expensiveFunction = useMemo(() => {
    console.log('running expensive component:', trackingIndex);
    let sum = 0;
    for (let i = 0; i < 1e5; i++) {
      sum += i;
    }
    return sum;
  }, []);

  console.log('expensiveValue:', trackingIndex, expensiveFunction);
  return <>{children}</>;
};

const ExpensiveComponent = () => {
  const [newItem, setNewItem] = useState('');
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
        type='text'
        placeholder='Enter New Item'
        value={newItem}
        onChange={(event) => {
          onHandleEntryChange(event);
        }}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
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

const MemoNotes = ({ isLightMode }) => {
  return (<SCNotesWrapper $islightmode={isLightMode}>
    <div>
      To optimize expensive calls we have memo, useMemo, and useCallback functions.
      Use these carefully as they all add extra comparison costs.
    </div>
    <div>
      You can wrap components around with memo.  However this only works if the
      props are primitives.  If you pass objects then the reference will be compared
      which will not work correctly.
    </div>
    <div>
      useMemo for expensive computations for a variable.
      useCallback for functions that you pass as a prop.
    </div>
  </SCNotesWrapper>)
}

const LIST_SIZE = 2000;
const TransitionComponent = () => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const onHandleChange = (e) => {
    setInput(e.target.value);
    startTransition(() => {
      const updatedList = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        updatedList.push(e.target.value);
      }
      setList(updatedList);
    });
  }

  return (
    <div>
      <input type='text' onChange={onHandleChange} value={input} />
      {isPending ? <div>Loading...</div> : <div>
        {list.map(item => <div key={item}>{item}</div>)}
      </div>}
    </div>
  );
};

const TransitionNotes = ({ isLightMode }) => {
  return (<SCNotesWrapper $islightmode={isLightMode}>
    <div>
    </div>
  </SCNotesWrapper>)
}


const conceptList = ['React  Context', 'Reducer', 'React Custom Hook', 'React Memo', 'useTransition'];
const ReactPage = () => {
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
              <h2>Context Provider Example</h2>
              <CountProvider>
                <CountCTXComponent />
              </CountProvider>
            </div>}
            {concept === conceptList[1] && <div>
              <h2>Reducer Example</h2>
              <SimpleCrudComponent />
            </div>}
            {concept === conceptList[2] && <div>
              <h2>Custom Hook Example</h2>
              <DebounceComponent />
            </div>}
            {concept === conceptList[3] && <div>
              <h2>Memo Example</h2>
              <ExpensiveComponent />
            </div>}
            {concept === conceptList[4] && <div>
              <h2>Transition Example</h2>
              <TransitionComponent />
            </div>}
          </SCExampleWrapper>
          {concept === conceptList[0] && <ContextNotes isLightMode={isLightMode} />}
          {concept === conceptList[1] && <ReducerNotes isLightMode={isLightMode} />}
          {concept === conceptList[2] && <HookNotes isLightMode={isLightMode} />}
          {concept === conceptList[3] && <MemoNotes isLightMode={isLightMode} />}
          {concept === conceptList[4] && <TransitionNotes isLightMode={isLightMode} />}
        </SCSectionWrapper>
        <SCDisplayCode>
          {concept === conceptList[0] && <>
            <DisplayContextExample />
            <DisplayProviderExample />
            <DisplayUseContextExample />
          </>}
          {concept === conceptList[1] && <>
            <DisplayReducerFunctionExample />
            <DisplayReducerExample />
          </>}
          {concept === conceptList[2] && <>
            <DisplayHookExample />
          </>}
          {concept === conceptList[3] && <>
            <DisplayMemoExample />
          </>}
          {concept === conceptList[4] && <>
            <DisplayTransitionExample />
          </>}
        </SCDisplayCode>
      </SCContentWrapper>
    </Page >
  );
};

export default ReactPage;

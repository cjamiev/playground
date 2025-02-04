import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const contextExampleCode = `const CountContext = createContext({
  count: 0,
  increment: () => { },
  decrement: () => { },
});
`;

export const DisplayContextExample = () => {
  return (
    <DisplayCode content={contextExampleCode}>
      <>
        <div className='line'>
          <span className='mk-blue'>const </span>
          <span className='mk-white'>CountContext </span>
          <span className='mk-red'>= </span>
          <span className='mk-green'>createContext </span>
          <span className='mk-yellow'>{'('}</span>
          <span className='mk-purple'>{'{'}</span>
        </div>
        <div className='line'>
          <span className='mk-white indent-1'>count: </span>
          <span className='mk-purple'>{'0'}</span>
          <span className='mk-white'>{','}</span>
        </div>
        <div className='line'>
          <span className='mk-green indent-1'>increment</span>
          <span className='mk-white'>: </span>
          <span className='mk-dkblue'>{'()'} </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-dkblue'>{'{'} </span>
          <span className='mk-dkblue'>{'}'}</span>
          <span className='mk-white'>,</span>
        </div>
        <div className='line'>
          <span className='mk-green indent-1'>decrement</span>
          <span className='mk-white'>: </span>
          <span className='mk-dkblue'>{'()'} </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-dkblue'>{'{'} </span>
          <span className='mk-dkblue'>{'}'}</span>
          <span className='mk-white'>,</span>
        </div>
        <div className='line'>
          <span className='mk-purple'>{'}'}</span>
          <span className='mk-yellow'>{')'} </span>
          <span className='mk-white'>; </span>
        </div>
      </>
    </DisplayCode>
  );
};

const providerExampleCode = `const CountProvider = ({ children }) => {
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
`;

export const DisplayProviderExample = () => {
  return (
    <DisplayCode content={providerExampleCode}>
      <>
        <div className='line'>
          <span className='mk-blue'>const </span>
          <span className='mk-green'>CountProvider </span>
          <span className='mk-red'>= </span>
          <span className='mk-purple'>{'('}</span>
          <span className='mk-yellow'>{'{'} </span>
          <span className='mk-orange'>children </span>
          <span className='mk-purple'>{'}'}</span>
          <span className='mk-yellow'>{')'} </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-yellow'>{'{'} </span>
        </div>
        <div className='line'>
          <span className='mk-blue indent-1'>const </span>
          <span className='mk-white'>{'['}</span>
          <span className='mk-white'>count</span>
          <span className='mk-white'>{','}</span>
          <span className='mk-white'>setCount</span>
          <span className='mk-white'>{']'}</span>
          <span className='mk-red'>= </span>
          <span className='mk-green'>useState</span>
          <span className='mk-purple'>{'('}</span>
          <span className='mk-white'>0</span>
          <span className='mk-purple'>{')'}</span>
          <span className='mk-white'>{';'}</span>
        </div>
        <div className='line'>
          <span className='mk-blue indent-1'>const </span>
          <span className='mk-white'>increment </span>
          <span className='mk-red'>= </span>
          <span className='mk-purple'>{'()'} </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-purple'>{'{'} </span>
          <span className='mk-green'>setCount</span>
          <span className='mk-blue'>{'('}</span>
          <span className='mk-orange'>c </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-white'>c </span>
          <span className='mk-red'>+ </span>
          <span className='mk-purple'>1</span>
          <span className='mk-blue'>{')'} </span>
          <span className='mk-dkblue'>{'}'}</span>
          <span className='mk-white'>;</span>
        </div>
        <div className='line'>
          <span className='mk-blue indent-1'>const </span>
          <span className='mk-white'>decrement </span>
          <span className='mk-red'>= </span>
          <span className='mk-purple'>{'()'} </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-purple'>{'{'} </span>
          <span className='mk-green'>setCount</span>
          <span className='mk-blue'>{'('}</span>
          <span className='mk-orange'>c </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-white'>c </span>
          <span className='mk-red'>- </span>
          <span className='mk-purple'>1</span>
          <span className='mk-blue'>{')'} </span>
          <span className='mk-dkblue'>{'}'}</span>
          <span className='mk-white'>;</span>
        </div>
        <div className='line'>
          <span className='mk-blue indent-1'>const </span>
          <span className='mk-white'>countValue </span>
          <span className='mk-red'>= </span>
          <span className='mk-purple'>{'{'} </span>
          <span className='mk-white'>count, </span>
          <span className='mk-white'>increment, </span>
          <span className='mk-white'>decrement </span>
          <span className='mk-purple'>{'}'}</span>
          <span className='mk-white'>;</span>
        </div>
        <div className='line' />
        <div className='line'>
          <span className='mk-red indent-1'>return </span>
          <span className='mk-purple'>{'('} </span>
        </div>
        <div className='line'>
          <span className='mk-white indent-2'>{'<'}</span>
          <span className='mk-blue'>CountContext.Provider</span>
          <span className='mk-green'> value</span>
          <span className='mk-red'>{'='}</span>
          <span className='mk-dkblue'>{'{'}</span>
          <span className='mk-white'>countValue</span>
          <span className='mk-dkblue'>{'}'}</span>
          <span className='mk-white'>{'>'}</span>
        </div>
        <div className='line'>
          <span className='mk-blue indent-3'>{'{'}</span>
          <span className='mk-white'>{'children'}</span>
          <span className='mk-blue'>{'}'}</span>
        </div>
        <div className='line'>
          <span className='mk-white indent-2'>{'</'}</span>
          <span className='mk-blue'>CountContext.Provider</span>
          <span className='mk-white'>{'>'}</span>
        </div>
        <div className='line'>
          <span className='mk-purple indent-1'>{')'} </span>
          <span className='mk-white'>; </span>
        </div>
        <div className='line'>
          <span className='mk-yellow'>{'}'}</span>
          <span className='mk-white'>; </span>
        </div>
      </>
    </DisplayCode>
  );
};

const useContextExampleCode = `const CountCTXComponent = () => {
  const { count, increment, decrement } = useContext(CountContext);

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
`;

export const DisplayUseContextExample = () => {
  return (
    <DisplayCode content={useContextExampleCode}>
      <>
        <div className='line'>
          <span className='mk-blue'>const </span>
          <span className='mk-green'>CountCTXComponent </span>
          <span className='mk-red'>= </span>
          <span className='mk-yellow'>{'()'} </span>
          <span className='mk-blue'>{'=>'} </span>
          <span className='mk-yellow'>{'{'} </span>
        </div>
        <div className='line'>
          <span className='mk-blue indent-1'>const </span>
          <span className='mk-purple'>{'{'} </span>
        </div>
        <div className='line'>
          <span className='mk-white indent-2'>count, </span>
        </div>
        <div className='line'>
          <span className='mk-white indent-2'>increment, </span>
        </div>
        <div className='line'>
          <span className='mk-white indent-2'>decrement </span>
        </div>
        <div className='line'>
          <span className='mk-purple indent-1'>{'}'} </span>
          <span className='mk-red'>= </span>
          <span className='mk-green'>useContext</span>
          <span className='mk-purple'>{'('}</span>
          <span className='mk-white'>CountContext</span>
          <span className='mk-purple'>{')'}</span>
          <span className='mk-white'>{';'}</span>
        </div>
        <div className='line' />
        <div className='line'>
          <span className='mk-red indent-1'>return </span>
          <span className='mk-purple'>{'('} </span>
        </div>
        <div className='line'>
          <span className='mk-white indent-2'>{'<'}</span>
          <span className='mk-red'>div</span>
          <span className='mk-white'>{'>'}</span>
        </div>
        <div className='line'>
          <span className='mk-white indent-3'>{'<'}</span>
          <span className='mk-red'>span</span>
          <span className='mk-white'>{'>'}</span>
          <span className='mk-white'>Count: </span>
          <span className='mk-blue'>{'{'}</span>
          <span className='mk-white'>{'count'}</span>
          <span className='mk-blue'>{'}'}</span>
          <span className='mk-white'>{'</'}</span>
          <span className='mk-red'>span</span>
          <span className='mk-white'>{'>'}</span>
        </div>
        <div className='line'>
          <span className='mk-white indent-3'>{'<'}</span>
          <span className='mk-red'>button</span>
          <span className='mk-green'> onClick</span>
          <span className='mk-red'>{'='}</span>
          <span className='mk-dkblue'>{'{'}</span>
          <span className='mk-white'>increment</span>
          <span className='mk-dkblue'>{'}'}</span>
          <span className='mk-white'>{'>'}</span>
          <span className='mk-white'>Increment</span>
          <span className='mk-white'>{'</'}</span>
          <span className='mk-red'>button</span>
          <span className='mk-white'>{'>'}</span>
        </div>
        <div className='line'>
          <span className='mk-white indent-3'>{'<'}</span>
          <span className='mk-red'>button</span>
          <span className='mk-green'> onClick</span>
          <span className='mk-red'>{'='}</span>
          <span className='mk-dkblue'>{'{'}</span>
          <span className='mk-white'>decrement</span>
          <span className='mk-dkblue'>{'}'}</span>
          <span className='mk-white'>{'>'}</span>
          <span className='mk-white'>Decrement</span>
          <span className='mk-white'>{'</'}</span>
          <span className='mk-red'>button</span>
          <span className='mk-white'>{'>'}</span>
        </div>
        <div className='line'>
          <span className='mk-white indent-2'>{'</'}</span>
          <span className='mk-red'>div</span>
          <span className='mk-white'>{'>'}</span>
        </div>
        <div className='line'>
          <span className='mk-purple indent-1'>{')'} </span>
          <span className='mk-white'>; </span>
        </div>
        <div className='line'>
          <span className='mk-yellow'>{'}'} </span>
          <span className='mk-white'>;</span>
        </div>
      </>
    </DisplayCode>
  );
};
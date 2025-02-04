import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const reducerFunctionExampleCode = `const simpleReducer = (
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
`;

export const DisplayReducerFunctionExample = () => {
  return (<DisplayCode content={reducerFunctionExampleCode}>
    <>
      <div className='line'>
        <span className='mk-blue'>const </span>
        <span className='mk-green'>simpleReducer </span>
        <span className='mk-red'>= </span>
        <span className='mk-yellow'>{'('} </span>
      </div>
      <div className='line'>
        <span className='mk-orange indent-1'>state</span>
        <span className='mk-white'>,</span>
      </div>
      <div className='line'>
        <span className='mk-orange indent-1'>action </span>
      </div>
      <div className='line'>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'} </span>
      </div>
      <div className='line'>
        <span className='mk-red indent-1'>switch </span>
        <span className='mk-purple'>(</span>
        <span className='mk-white'>action.type</span>
        <span className='mk-purple'>)</span>
        <span className='mk-purple'>{'{'} </span>
      </div>
      <div className='line'>
        <span className='mk-red indent-2'>case </span>
        <span className='mk-yellow'>{"'"}</span>
        <span className='mk-yellow'>{'ADD'}</span>
        <span className='mk-yellow'>{"'"}</span>
        <span className='mk-white'>{':'}</span>
      </div>
      <div className='line'>
        <span className='mk-red indent-3'>return </span>
        <span className='mk-white'>state.</span>
        <span className='mk-green'>concat</span>
        <span className='mk-dkblue'>(</span>
        <span className='mk-white'>action.payload</span>
        <span className='mk-dkblue'>)</span>
        <span className='mk-white'>;</span>
      </div>
      <div className='line'>
        <span className='mk-red indent-2'>case </span>
        <span className='mk-yellow'>{"'"}</span>
        <span className='mk-yellow'>{'DELETE'}</span>
        <span className='mk-yellow'>{"'"}</span>
        <span className='mk-white'>{':'}</span>
      </div>
      <div className='line'>
        <span className='mk-red indent-3'>return </span>
        <span className='mk-green'>state.filter</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-orange'>item </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-white'>item.id </span>
        <span className='mk-red'>!== </span>
        <span className='mk-white'>action.payload.id </span>
        <span className='mk-blue'>{')'} </span>
        <span className='mk-white'>; </span>
      </div>
      <div className='line'>
        <span className='mk-red indent-2'>default</span>
        <span className='mk-white'>:</span>
      </div>
      <div className='line'>
        <span className='mk-red indent-3'>return </span>
        <span className='mk-white'>state; </span>
      </div>
      <div className='line'>
        <span className='mk-purple indent-1'>{'}'}</span>
      </div>
      <div className='line'>
        <span className='mk-yellow'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode>)
}

const reducerExampleCode = `const SimpleCrudComponent = () => {
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
`;

export const DisplayReducerExample = () => {
  return (<DisplayCode content={reducerExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-white'>dictionaryURL </span>
        <span className='mk-red'>= </span>
        <span className='mk-yellow'>{"'"}</span>
        <span className='mk-yellow'>https://api.dictionaryapi.dev/api/v2/entries/en/</span>
        <span className='mk-yellow'>{"'"}</span>
        <span className='mk-white'>;</span>
      </div><div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-white'>FetchComponent </span>
        <span className='mk-red'>= </span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>word</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>setWord</span>
        <span className='mk-purple'>{']'}</span>
        <span className='mk-red'> = </span>
        <span className='mk-green'>useState</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-yellow'>{"''"}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-purple'>;</span>
      </div><div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>isLoading</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>setIsLoading</span>
        <span className='mk-purple'>{']'}</span>
        <span className='mk-red'> = </span>
        <span className='mk-green'>useState</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-purple'>false</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>definition</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>setDefinition</span>
        <span className='mk-purple'>{']'}</span>
        <span className='mk-red'> = </span>
        <span className='mk-green'>useState</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-blue'>{'['}</span>
        <span className='mk-blue'>{']'}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-green'>onHandleWordChange </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>event</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-2'>setWord</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-white'>event</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>target</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>value</span>
        <span className='mk-blue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-purple indent-1'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-green'>onSubmit </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-2'>setIsLoading</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-white'>true</span>
        <span className='mk-blue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-green indent-2'>fetch</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-white'>dictionaryURL </span>
        <span className='mk-red'>+ </span>
        <span className='mk-white'>word</span>
        <span className='mk-blue'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-3'>.</span>
        <span className='mk-green'>then</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-orange'>response </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-white'>response</span>
        <span className='mk-white'>.</span>
        <span className='mk-green'>json</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-blue'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-3'>.</span>
        <span className='mk-green'>then</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-orange'>response </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-white'>setDefinition</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-white'>response </span>
      </div><div className="line">
        <span className='mk-white indent-4'>.</span>
        <span className='mk-green'>map</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>i </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-white'>i </span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>meanings</span>
        <span className='mk-purple'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-4'>.</span>
        <span className='mk-green'>map</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>entry </span>
        <span className='mk-blue'>{'=>'} </span>
      </div><div className="line">
        <span className='mk-white indent-5'>entry</span>
        <span className='mk-white'>.</span>
        <span className='mk-green'>map</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-orange'>item </span>
        <span className='mk-blue'>{'=>'} </span>
      </div><div className="line">
        <span className='mk-white indent-6'>item</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>definitions</span>
        <span className='mk-white'>.</span>
        <span className='mk-green'>map</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-orange'>i </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-white'>i </span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>definition </span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-blue'>{')'}</span>
        <span className='mk-purple'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-4'>.</span>
        <span className='mk-green'>reduce</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-orange'>curr </span>
        <span className='mk-white'>, </span>
        <span className='mk-orange'>accum </span>
        <span className='mk-blue'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-blue'>{'{'}</span>
      </div><div className="line">
        <span className='mk-red indent-5'>return </span>
        <span className='mk-yellow'>{'['}</span>
        <span className='mk-red'>...</span>
        <span className='mk-white'>curr </span>
        <span className='mk-white'>, </span>
        <span className='mk-red'>...</span>
        <span className='mk-white'>accum</span>
        <span className='mk-yellow'>{']'}</span>
      </div><div className="line">
        <span className='mk-blue indent-4'>{'}'}</span>
        <span className='mk-white'>, </span>
        <span className='mk-blue'>{'['}</span>
        <span className='mk-blue'>{']'}</span>
        <span className='mk-purple'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-4'>.</span>
        <span className='mk-green'>reduce</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-orange'>curr </span>
        <span className='mk-white'>, </span>
        <span className='mk-orange'>accum </span>
        <span className='mk-blue'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-blue'>{'{'}</span>
      </div><div className="line">
        <span className='mk-red indent-5'>return </span>
        <span className='mk-yellow'>{'['}</span>
        <span className='mk-red'>...</span>
        <span className='mk-white'>curr </span>
        <span className='mk-white'>, </span>
        <span className='mk-red'>...</span>
        <span className='mk-white'>accum </span>
        <span className='mk-yellow'>{']'}</span>
      </div><div className="line">
        <span className='mk-blue indent-4'>{'}'}</span>
        <span className='mk-white'>, </span>
        <span className='mk-blue'>{'['}</span>
        <span className='mk-blue'>{']'}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-blue'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-3'>.</span>
        <span className='mk-green'>finally</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-4'>setIsLoading </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-purple'>false</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow indent-3'>{'}'}</span>
        <span className='mk-blue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-purple indent-1'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div>
      <div className="line" />
      <div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-green'>onClear </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-2'>setDefinition</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-yellow'>{'['}</span>
        <span className='mk-yellow'>{']'}</span>
        <span className='mk-blue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-purple indent-1'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-red indent-1'>return </span>
        <span className='mk-purple'>{'('}</span>
      </div><div className="line">
        <span className='mk-white indent-2'>{'<'}</span>
        <span className='mk-white'>{'>'}</span>
      </div><div className="line">
        <span className='mk-white indent-3'>{'<'}</span>
        <span className='mk-red'>div</span>
        <span className='mk-white'>{'>'}</span>
      </div><div className="line">
        <span className='mk-white indent-4'>{'<'}</span>
        <span className='mk-red'>input </span>
      </div><div className="line">
        <span className='mk-green indent-5'>type</span>
        <span className='mk-red'>=</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-yellow'>text</span>
        <span className='mk-yellow'>'</span>
      </div><div className="line">
        <span className='mk-green indent-5'>placeholder</span>
        <span className='mk-red'>=</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-yellow'>Enter </span>
        <span className='mk-yellow'>Word</span>
        <span className='mk-yellow'>'</span>
      </div><div className="line">
        <span className='mk-green indent-5'>onChange</span>
        <span className='mk-red'>=</span>
        <span className='mk-blue'>{'{'}</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-white'>event</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-6'>onHandleWordChange</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>event</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>;</span>
      </div><div className="line">
        <span className='mk-yellow indent-5'>{'}'}</span>
        <span className='mk-blue'>{'}'}</span>
      </div><div className="line">
        <span className='mk-green indent-5'>value</span>
        <span className='mk-red'>=</span>
        <span className='mk-blue'>{'{'}</span>
        <span className='mk-white'>word</span>
        <span className='mk-blue'>{'}'}</span>
      </div><div className="line">
        <span className='mk-white indent-4'>{'/'}</span>
        <span className='mk-white'>{'>'}</span>
      </div><div className="line">
        <span className='mk-white indent-4'>{'<'}</span>
        <span className='mk-red'>button </span>
        <span className='mk-green'>onClick</span>
        <span className='mk-red'>=</span>
        <span className='mk-blue'>{'{'}</span>
        <span className='mk-white'>onSubmit</span>
        <span className='mk-blue'>{'}'}</span>
        <span className='mk-white'>{'>'}</span>
        <span className='mk-white'>Submit</span>
        <span className='mk-white'>{'</'}</span>
        <span className='mk-red'>button</span>
        <span className='mk-white'>{'>'}</span>
      </div><div className="line">
        <span className='mk-white indent-4'>{'<'}</span>
        <span className='mk-red'>button </span>
        <span className='mk-green'>onClick</span>
        <span className='mk-red'>=</span>
        <span className='mk-blue'>{'{'}</span>
        <span className='mk-white'>onClear</span>
        <span className='mk-blue'>{'}'}</span>
        <span className='mk-white'>{'>'}</span>
        <span className='mk-white'>clear</span>
        <span className='mk-white'>{'</'}</span>
        <span className='mk-red'>button</span>
        <span className='mk-white'>{'>'}</span>
      </div><div className="line">
        <span className='mk-white indent-3'>{'</'}</span>
        <span className='mk-red'>div </span>
        <span className='mk-white'>{'>'}</span>
      </div><div className="line">
        <span className='mk-white indent-2'>{'<'}</span>
        <span className='mk-white'>{'/'} </span>
        <span className='mk-white'>{'>'}</span>
      </div><div className="line">
        <span className='mk-purple indent-1'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow '>{'}'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode >)
}
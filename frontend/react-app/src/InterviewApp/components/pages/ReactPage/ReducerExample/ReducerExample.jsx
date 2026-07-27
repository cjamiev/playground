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
};`;

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
        <span className='mk-purple'>) </span>
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
        <span className='mk-white'>state</span>
        <span className='mk-white'>.</span>
        <span className='mk-green'>filter</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-orange'>item </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-white'>item.id </span>
        <span className='mk-red'>!== </span>
        <span className='mk-white'>action.payload.id</span>
        <span className='mk-dkblue'>{')'}</span>
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

const reducerExampleCode = `const [list, dispatch] = useReducer(simpleReducer, []);

const addToList = () => {
  dispatch({
    type: 'ADD',
    payload: {
      id: list.length
    },
  });
};
 
const deleteTodo = (id) => {
  dispatch({ type: 'DELETE', payload: { id } });
};`;

export const DisplayReducerExample = () => {
  return (<DisplayCode content={reducerExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>list </span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>dispatch</span>
        <span className='mk-purple'>{']'} </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>useReducer</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>simpleReducer </span>
        <span className='mk-white'>, </span>
        <span className='mk-blue'>{'['}</span>
        <span className='mk-blue'>{']'}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-white'>addToList </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-1'>dispatch</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-white indent-2'>type</span>
        <span className='mk-white'>: </span>
        <span className='mk-yellow'>'</span>
        <span className='mk-yellow'>ADD</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-white'>, </span>
      </div><div className="line">
        <span className='mk-white indent-2'>payload</span>
        <span className='mk-white'>: </span>
        <span className='mk-purple'>{'{'}</span>
      </div><div className="line">
        <span className='mk-white indent-3'>id</span>
        <span className='mk-white'>: </span>
        <span className='mk-white'>list</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>length</span>
        <span className='mk-white'>, </span>
      </div><div className="line">
        <span className='mk-purple indent-2'>{'}'}</span>
        <span className='mk-white'>, </span>
      </div><div className="line">
        <span className='mk-yellow indent-1'>{'}'}</span>
        <span className='mk-dkblue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-purple'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-white'>deleteTodo </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>id</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-1'>dispatch</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-yellow'>{'{'}</span>
        <span className='mk-white'>type </span>
        <span className='mk-white'>: </span>
        <span className='mk-yellow'>'</span>
        <span className='mk-yellow'>DELETE</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>payload </span>
        <span className='mk-white'>: </span>
        <span className='mk-purple'>{'{'}</span>
        <span className='mk-white'> id </span>
        <span className='mk-purple'>{'}'} </span>
        <span className='mk-yellow'>{'}'}</span>
        <span className='mk-dkblue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-purple'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode >)
}
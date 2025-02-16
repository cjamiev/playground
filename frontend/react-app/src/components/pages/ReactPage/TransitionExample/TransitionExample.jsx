import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const transitionExampleCode = `const [isPending, startTransition] = useTransition();
const [input, setInput] = useState('');
const [list, setList] = useState([]);

const onHandleChange = (e) => {
  setInput(e.target.value);
  startTransition(() => {
    const updatedList = [];
    for (let i = 0; i < 2000; i++) {
      updatedList.push(e.target.value);
    }
    setList(updatedList);
  });
}`;

export const DisplayTransitionExample = () => {
  return (<DisplayCode content={transitionExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>isPending</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>startTransition</span>
        <span className='mk-purple'>{']'} </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>useTransition</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>input</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>setInput</span>
        <span className='mk-purple'>{']'} </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>useState</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-yellow'>''</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>list</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>setList</span>
        <span className='mk-purple'>{']'} </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>useState</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-dkblue'>{'['}</span>
        <span className='mk-dkblue'>{']'}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div>
      <div className="line">
      </div>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-green'>onHandleChange </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-orange'>e</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div>
      <div className="line">
        <span className='mk-green indent-1'>setInput</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-white'>e</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>target</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>value</span>
        <span className='mk-dkblue'>{')'}</span>
        <span className='mk-white'>;</span>
      </div>
      <div className="line">
        <span className='mk-green indent-1'>startTransition</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div>
      <div className="line">
        <span className='mk-blue indent-2'>const </span>
        <span className='mk-white'>updatedList </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-purple'>{']'}</span>
        <span className='mk-white'>; </span>
      </div>
      <div className="line">
        <span className='mk-red indent-2'>for </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-blue'>let </span>
        <span className='mk-white'>i </span>
        <span className='mk-red'>= </span>
        <span className='mk-dkpurple'>0</span>
        <span className='mk-white'>; </span>
        <span className='mk-white'>i </span>
        <span className='mk-white'>{'<'} </span>
        <span className='mk-dkpurple'>2000</span>
        <span className='mk-white'>; </span>
        <span className='mk-white'>i</span>
        <span className='mk-red'>+</span>
        <span className='mk-red'>+</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div>
      <div className="line">
        <span className='mk-white indent-3'>updatedList</span>
        <span className='mk-white'>.</span>
        <span className='mk-green'>push</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-white'>e</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>target</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>value</span>
        <span className='mk-dkblue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div>
      <div className="line">
        <span className='mk-purple indent-2'>{'}'}</span>
      </div>
      <div className="line">
        <span className='mk-green indent-2'>setList</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>updatedList</span>
        <span className='mk-dkpurple'>{')'}</span>
        <span className='mk-white'>;</span>
      </div>
      <div className="line">
        <span className='mk-yellow indent-1'>{'}'}</span>
        <span className='mk-dkblue'>{')'}</span>
        <span className='mk-white'>;</span>
      </div>
      <div className="line">
        <span className='mk-dkpurple'>{'}'}</span>
      </div>
    </>
  </DisplayCode >)
}
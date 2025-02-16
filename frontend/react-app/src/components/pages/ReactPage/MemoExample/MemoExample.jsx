import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const memoExampleCode = `const expensiveFunction = useMemo(() => {
  let sum = 0;
  for (let i = 0; i < 1e5; i++) {
    sum += i;
  }
  return sum;
}, []);`;

export const DisplayMemoExample = () => {
  return (<DisplayCode content={memoExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-white'>expensiveFunction </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>useMemo</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-dkblue'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-dkblue'>{'{'}</span>
      </div><div className="line">
        <span className='mk-blue indent-1'>let </span>
        <span className='mk-white'>sum </span>
        <span className='mk-red'>= </span>
        <span className='mk-dkpurple'>0</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-red indent-1'>for </span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-blue'>let </span>
        <span className='mk-white'>i </span>
        <span className='mk-red'>= </span>
        <span className='mk-dkpurple'>0</span>
        <span className='mk-white'>; </span>
        <span className='mk-white'>i </span>
        <span className='mk-red'>{'<'} </span>
        <span className='mk-dkpurple'>1e5</span>
        <span className='mk-white'>; </span>
        <span className='mk-white'>i</span>
        <span className='mk-red'>+</span>
        <span className='mk-red'>+</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-white indent-2'>sum </span>
        <span className='mk-red'>+</span>
        <span className='mk-red'>= </span>
        <span className='mk-white'>i</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow indent-1'>{'}'}</span>
      </div><div className="line">
        <span className='mk-red indent-1'>return </span>
        <span className='mk-white'>sum</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-dkblue indent'>{'}'}</span>
        <span className='mk-white'>, </span>
        <span className='mk-dkblue'>{'['}</span>
        <span className='mk-dkblue'>{']'}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode >)
}
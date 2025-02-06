import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const memoExampleCode = `const ExpensiveSection = ({ children }) => {
  const expensiveFunction = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 1e5; i++) {
      sum += i;
    }
    return sum;
  }, []);

  return <>{children}</>;
};`;

export const DisplayMemoExample = () => {
  return (<DisplayCode content={memoExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-green'>ExpensiveSection </span>
        <span className='mk-red'>= </span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-purple'>{'{'}</span>
        <span className='mk-orange'> children </span>
        <span className='mk-purple'>{'}'}</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div>
      <div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-white'>expensiveFunction </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>useMemo</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-dkblue'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-dkblue'>{'{'}</span>
      </div><div className="line">
        <span className='mk-blue indent-2'>let </span>
        <span className='mk-white'>sum </span>
        <span className='mk-red'>= </span>
        <span className='mk-dkpurple'>0</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-red indent-2'>for </span>
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
        <span className='mk-white indent-3'>sum </span>
        <span className='mk-red'>+</span>
        <span className='mk-red'>= </span>
        <span className='mk-white'>i</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow indent-2'>{'}'}</span>
      </div><div className="line">
        <span className='mk-red indent-2'>return </span>
        <span className='mk-white'>sum</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-dkblue indent-1'>{'}'}</span>
        <span className='mk-white'>, </span>
        <span className='mk-dkblue'>{'['}</span>
        <span className='mk-dkblue'>{']'}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-red indent-1'>return </span>
        <span className='mk-white'>{'<'}</span>
        <span className='mk-white'>{'>'}</span>
        <span className='mk-purple'>{'{'}</span>
        <span className='mk-white'>children</span>
        <span className='mk-purple'>{'}'}</span>
        <span className='mk-white'>{'</>'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode >)
}
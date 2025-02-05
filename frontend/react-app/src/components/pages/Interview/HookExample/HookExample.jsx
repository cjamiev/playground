import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const hookExampleCode = `const useDebounceValue = (value, time) => {
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
};`;

export const DisplayHookExample = () => {
  return (<DisplayCode content={hookExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-green'>useDebounceValue </span>
        <span className='mk-red'>= </span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-orange'>value</span>
        <span className='mk-white'>, </span>
        <span className='mk-orange'>time</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div>
      <div className="line">
        <span className='mk-blue indent-1'>const </span>
        <span className='mk-purple'>{'['}</span>
        <span className='mk-white'>debouncedValue</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>setDebouncedValue</span>
        <span className='mk-purple'>{']'} </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>useState</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>''</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-purple'>;</span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-green indent-1'>useEffect</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-blue'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-blue'>{'{'}</span>
      </div><div className="line">
        <span className='mk-blue indent-2'>let </span>
        <span className='mk-white'>timeOutId </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>0 </span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-red indent-2'>if </span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-white'>time</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-white indent-3'>timeOutId </span>
        <span className='mk-red'>= </span>
        <span className='mk-green'>setTimeout</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-blue'>{'('}</span>
        <span className='mk-blue'>{')'}</span>
        <span className='mk-blue'> {'=>'} </span>
        <span className='mk-blue'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-4'>setDebouncedValue</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-white'>value</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-blue indent-3'>{'}'}</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>time</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow indent-2'>{'}'}</span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-red indent-2'>return </span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-3'>clearTimeout</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-white'>timeOutId</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow indent-2'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-blue indent-1'>{'}'}</span>
        <span className='mk-white'>, </span>
        <span className='mk-blue'>{'['}</span>
        <span className='mk-white'>value</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>time</span>
        <span className='mk-blue'>{']'}</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-red indent-1'>return </span>
        <span className='mk-white'>debouncedValue</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode >)
}
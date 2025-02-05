import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const apiExampleCode = `const onSubmit = () => {
  setIsLoading(true);
  fetch(dictionaryURL + word)
    .then(response => response.json())
    .then(response => setDefinition(response))
    .finally(() => {
      setIsLoading(false);
    });
};`;

export const DisplayApiExample = () => {
  return (<DisplayCode content={apiExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-green'>onSubmit </span>
        <span className='mk-red'>= </span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-purple'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-purple'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-1'>setIsLoading</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-dkpurple'>true</span>
        <span className='mk-dkblue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-green indent-1'>fetch</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-white'>dictionaryURL </span>
        <span className='mk-red'>+ </span>
        <span className='mk-white'>word </span>
        <span className='mk-dkblue'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-2'>.</span>
        <span className='mk-green'>then</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-orange'>response </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-white'>response</span>
        <span className='mk-white'>.</span>
        <span className='mk-green'>json</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-dkblue'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-2'>.</span>
        <span className='mk-green'>then</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-orange'>response </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-green'>setDefinition</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-white'>response</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-dkblue'>{')'}</span>
      </div><div className="line">
        <span className='mk-white indent-2'>.</span>
        <span className='mk-green'>finally</span>
        <span className='mk-dkblue'>{'('}</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-3'>setIsLoading</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-dkpurple'>false</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow indent-1'>{'}'}</span>
        <span className='mk-dkblue'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-purple'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode >)
}
import DisplayCode from "../../../atoms/DisplayCode/DisplayCode";

const apiExampleCode = `const getCoordinates = (event) => {
  setCoordinates({ x: event.clientX, y: event.clientY });
};

addEventListener('mousedown', getCoordinates);

removeEventListener('mousedown', getCoordinates);`;

export const DisplayEventExample = () => {
  return (<DisplayCode content={apiExampleCode}>
    <>
      <div className="line">
        <span className='mk-blue'>const </span>
        <span className='mk-green'>getCoordinates </span>
        <span className='mk-red'>= </span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-orange'>event</span>
        <span className='mk-yellow'>{')'} </span>
        <span className='mk-blue'>{'=>'} </span>
        <span className='mk-yellow'>{'{'}</span>
      </div><div className="line">
        <span className='mk-green indent-1'>setCoordinates</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-dkblue'>{'{'} </span>
        <span className='mk-white'>x</span>
        <span className='mk-white'>: </span>
        <span className='mk-white'>event</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>clientX</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>y</span>
        <span className='mk-white'>: </span>
        <span className='mk-white'>event</span>
        <span className='mk-white'>.</span>
        <span className='mk-white'>clientY </span>
        <span className='mk-dkblue'>{'}'}</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
        <span className='mk-yellow'>{'}'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-green'>addEventListener</span>
        <span className='mk-yellow'>{'('}</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-yellow'>mousedown</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>getCoordinates</span>
        <span className='mk-yellow'>{')'}</span>
        <span className='mk-white'>; </span>
      </div><div className="line">
      </div><div className="line">
        <span className='mk-green'>removeEventListener</span>
        <span className='mk-purple'>{'('}</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-yellow'>mousedown</span>
        <span className='mk-yellow'>'</span>
        <span className='mk-white'>, </span>
        <span className='mk-white'>getCoordinates</span>
        <span className='mk-purple'>{')'}</span>
        <span className='mk-white'>; </span>
      </div>
    </>
  </DisplayCode >)
}
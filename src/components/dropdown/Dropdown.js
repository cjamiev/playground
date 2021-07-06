import React, { useState } from 'react';
import './dropdown.css';

const Dropdown = React.memo(({ label, data }) => {
  const [show, setShow] = useState(false);

  const renderContent = data.map(({value}) => {
    return (
      <span key={value} className="dropdown__item"> {value} </span>
    );
  });

  return (
    <div className="dropdown" onClick={() => { setShow(!show);}}> {label}
      {show && (<div className='dropdown__content'>{renderContent}</div>)}
    </div>
  );
});

export default Dropdown;

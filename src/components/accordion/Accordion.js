import React, { useState } from 'react';
import './accordion.css';

const Accordion = React.memo(({ label, content }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="accordion">
      <div className={'accordion__label'} onClick={toggle}>{label}</div>
      {!isCollapsed && <div className={'accordion__content'}>{content}</div>}
    </div>
  );
});

export default Accordion;

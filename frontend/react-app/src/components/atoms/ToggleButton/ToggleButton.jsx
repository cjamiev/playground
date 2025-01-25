import React, { useState } from 'react';

const ToggleButton = ({ onClick }) => {
  const [toggle, setToggle] = useState(false);

  const className = toggle ? 'toggle-icon__circle toggle-icon--on' : 'toggle-icon__circle toggle-icon--off';

  return <svg>
    <g
      aria-label="toggle"
      className="clickable"
      onClick={() => {
        setToggle(!toggle);
        onClick();
      }}
      transform="translate(0.21371969,11.548629) scale(2.0)"
    >
      <rect
        className="toggle-icon__border"
        width="25.733217"
        height="25.733217"
        x="13.777549"
        y="2.0604792"
        rx="0"
        ry="0" />
      <circle
        className="toggle-icon__border"
        cx="39.126549"
        cy="14.927094"
        r="12.866609" />
      <circle
        className="toggle-icon__border"
        cx="13.362679"
        cy="14.892315"
        r="12.866609" />
      <circle
        className={className}
        cx="13"
        cy="14.587223"
        r="10.722174" />
    </g>
  </svg>;
};

export default ToggleButton;

import React from 'react';

const InfoIcon = () => {
  return (
    <g aria-label="info">
      <ellipse className="icon--hollow" cx="26.39" cy="26.52" rx="24.55" ry="24.88" />
      <g transform="matrix(0.85,0,0,0.85,3.84,3.65)">
        <rect
          className="icon--black"
          width="10.40"
          height="34.50"
          x="21.25"
          y="16.77"
          rx="53.48"
          ry="7.42"
        />
        <ellipse className="icon--black" cx="26.45" cy="6.09" rx="4.63" ry="4.10" />
      </g>
    </g>
  );
};

export default InfoIcon;

import React, { useState } from 'react';
import './testanimation.css';

const TestAnimation = () => {

  return (
    <div className="animation__container">
      <svg>
        <circle
          className="animation__circle"
          cx='50'
          cy='50'
          r='49'
        />
      </svg>
    </div>
  );
};

export default TestAnimation;

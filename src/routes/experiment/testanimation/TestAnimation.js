import React, { useState } from 'react';
import './testanimation.css';

const TestAnimation = () => {

  return (
    <div class="animation__container">
      <svg>
        <circle
          class="animation__circle"
          cx='50'
          cy='50'
          r='49'
        />
      </svg>
    </div>
  );
};

export default TestAnimation;

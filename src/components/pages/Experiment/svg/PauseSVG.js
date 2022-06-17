/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const PauseSVG = ({ transform, conditions = {} }) => {

  return (
    <g transform={transform}>
      <path data-testid="component-pause" className="svg__33" aria-label="pause" d="m 13.15407,0.823645 c -1.04863,0 -1.89292,0.84429 -1.89292,1.89292 v 48.56686 c 0,1.04864 0.84429,1.89293 1.89292,1.89293 h 8.96841 c 1.04864,0 1.89315,-0.84429 1.89315,-1.89293 V 2.716565 c 0,-1.04863 -0.84451,-1.89292 -1.89315,-1.89292 z m 18.72337,0 c -1.04878,0 -1.89307,0.84429 -1.89307,1.89292 v 48.56686 c 0,1.04864 0.84429,1.89293 1.89307,1.89293 h 8.96847 c 1.04877,0 1.89294,-0.84429 1.89294,-1.89293 V 2.716565 c 0,-1.04863 -0.84417,-1.89292 -1.89294,-1.89292 z" />
    </g>
  );
};


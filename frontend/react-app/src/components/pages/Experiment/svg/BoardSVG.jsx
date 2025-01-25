/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const BoardSVG = ({ transform, conditions = {} }) => {
  const { showBoard1, showBoard2 } = conditions;

  return (
    <g transform={transform}>
      <g data-testid="component-board" aria-label="board" >
        <rect data-testid="rect-board" className="svg__96" aria-label="rect board" width="47.517624" height="46.074627" x="3.244849" y="5.5040269" rx="4.5476584" ry="4.5476584" />
        <rect data-testid="rect13133" className="svg__97" width="2.7244563" height="4.4503994" x="11.035173" y="0.74953091" />
        <rect data-testid="rect13133-8" className="svg__98" width="2.7085984" height="4.6635981" x="40.971333" y="0.75752652" />
        { showBoard1 && <rect data-testid="board1" className="svg__84" width="51.899998" height="3.946768" x="1.0500051" y="9.1282234" /> }
        { showBoard2 && <rect data-testid="board2" className="svg__84" aria-label="condition board2" width="46.839195" height="36.37719" x="3.5840628" y="14.056965" ry="1.5504147" rx="1.5504147" /> }
      </g>
    </g>
  );
};


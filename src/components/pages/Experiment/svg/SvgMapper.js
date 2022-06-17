import React from 'react';
import svgDataMapper from './index';

const testData = [
  { component: 'Archive', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'ArrowCircle', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Bell', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Block', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  {
    component: 'Board',
    transform: 'translate(0,0)',
    conditions: { showBoard1: true, showBoard2: true },
    subcomponents: []
  },
  { component: 'Calculator', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'CalendarClock', transform: 'translate(0,0)', conditions: { showClock: true }, subcomponents: [] },
  { component: 'Caret', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'CheckMark', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Circle', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Clipboard', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Clock', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Close', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'CodeBrace', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Controller', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'CopyFile', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Data', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  {
    component: 'Dice',
    transform: 'translate(0,0)',
    conditions: { showFour: true, showOne: true, showSix: true },
    subcomponents: []
  },
  { component: 'Directory', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'DownArrow', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Download', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Exit', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Eye', transform: 'translate(0,0)', conditions: { showCross: true }, subcomponents: [] },
  { component: 'File', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Flask', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Graph', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Grid', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'HeartBeat', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Home', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Image', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Info', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Link', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Lock', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Minus', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Moon', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Pause', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Pen', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Play', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Plus', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'PowerSwitch', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Profile', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Refresh', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Save', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Search', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Setting', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  {
    component: 'Sound',
    transform: 'translate(0,0)',
    conditions: { showNotMute: true, showMute: true },
    subcomponents: []
  },
  { component: 'Star', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Stop', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Sun', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Text', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Toggle', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Trash', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Triangle', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'Triple', transform: 'translate(0,0)', conditions: {}, subcomponents: [] },
  { component: 'TripleDot', transform: 'translate(0,0)', conditions: {}, subcomponents: [] }
].map((item, index) => {
  const SIXTY = 60;
  const TEN = 10;
  const translateX = (index % TEN) * SIXTY;
  const translateY = Math.floor(index / TEN) * SIXTY;

  return {
    ...item,
    transform: `translate(${translateX},${translateY})`
  };
});

const SvgMapper = ({ data = testData }) => {
  const renderData = svgDataMapper(data).map((item) => {
    const SvgComponent = item.component;
    const key = SvgComponent.name + item.transform + JSON.stringify(item.subcomponents);

    return (
      <SvgComponent
        key={key}
        transform={item.transform}
        conditions={item.conditions}
        subcomponents={item.subcomponents}
      />
    );
  });

  return (
    <svg className="svg--primary-color" width="600" height="600" viewBox="0 0 600 600">
      {renderData}
    </svg>
  );
};

export default SvgMapper;

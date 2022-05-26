import React from 'react';
import TimerForm from 'components/form/TimerForm';

const HomeSidePanel = ({ onChangeTimer, selectedTimer }) => {
  return (
    <div className="container--center">
      <h3> Add Timer </h3>
      <TimerForm
        onChange={({ name, content }) => {
          const newTimer = { name, value: content, type: 'timer' };

          onChangeTimer(newTimer);
        }}
        value={selectedTimer}
      />
    </div>
  );
};

export default HomeSidePanel;

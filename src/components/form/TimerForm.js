import React, { useState } from 'react';
import Button from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Switch from 'components/switch';

const ZERO = 0;
const ONE = 1;
const TWELVE = 12;

const TimerForm = ({ onChange }) => {
  const today = new Date();
  const [name, setName] = useState('');
  const [month, setMonth] = useState(today.getMonth() + ONE);
  const [day, setDay] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [hour, setHour] = useState((today.getHours() +ONE) % TWELVE);
  const [minute, setMinute] = useState(ZERO);
  const [second, setSecond] = useState(ZERO);
  const [amOrPmMode, setAmOrPmMode] = useState(today.getHours() + ONE - TWELVE > ZERO ? ONE : ZERO);
  const [removeMode, setRemoveMode] = useState(false);

  return (
    <div>
      <div>
        <Text label='Name' selected={name} onChange={({selected}) => { setName(selected); }} />
      </div>
      <div>
        <Text label='Month' selected={month} onChange={({selected}) => { setMonth(selected); }} />
        <Text label='Day' selected={day} onChange={({selected}) => { setDay(selected); }} />
        <Text label='Year' selected={year} onChange={({selected}) => { setYear(selected); }} />
      </div>
      <div>
        <Text label='Hour' selected={hour} onChange={({selected}) => { setHour(selected); }} />
        <Text label='Minute' selected={minute} onChange={({selected}) => { setMinute(selected); }} />
        <Text label='Second' selected={second} onChange={({selected}) => { setSecond(selected); }} />
        <Switch data={[{ label: 'am' }, { label: 'pm'}]} switchIndex={amOrPmMode} onToggleSwitch={(index) => { setAmOrPmMode(index);}} />
      </div>
      <Button label='Save' classColor='primary' onClick={
        () => {
          if(name) {
            const parsedHour = amOrPmMode ? Number(hour) + TWELVE : Number(hour);
            const timerContent = { month: Number(month), day: Number(day), year: Number(year), hour: parsedHour, minute: Number(minute), second: Number(second) };
            onChange({ name, content: timerContent});
            setName('');
          }
        }
      } />
    </div>
  );
};

export default TimerForm;
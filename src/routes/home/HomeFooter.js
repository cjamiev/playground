import React, { useState } from 'react';
import Button from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import Switch from 'components/switch';
import { DisplayTimer } from 'components/list/List';
import { copyToClipboard } from 'helper/copy';

const ZERO = 0;
const ONE = 1;
const TWELVE = 12;

const HomeFooter = () => {
  const today = new Date();
  const [toggleClip, setToggleClip] = useState(false);
  const [toggleTimer, setToggleTimer] = useState(false);
  const [copyName, setCopyName] = useState('');
  const [copyContent, setCopyContent] = useState('');
  const [month, setMonth] = useState(today.getMonth()+ONE);
  const [day, setDay] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [hour, setHour] = useState((today.getHours()+ONE)%TWELVE);
  const [minute, setMinute] = useState(ZERO);
  const [second, setSecond] = useState(ZERO);
  const [amOrPmMode, setAmOrPmMode] = useState(today.getHours()+ ONE - TWELVE > ZERO ? ONE : ZERO);
  const [removeMode, setRemoveMode] = useState(false);

  const footerClass = toggleClip ? 'quick-clipboard-add-new-container quick-clipboard-add-new-container-active' : 'quick-clipboard-add-new-container';

  const clipboard = localStorage.getItem('clipboard') || '[]';
  const clipboardData = JSON.parse(clipboard);
  const copyButtons = clipboardData.filter(item => item.type === 'copy').map(item => {
    return <Button key={item.name} label={item.name} onClick={() => {
      if(!removeMode) {
        copyToClipboard(item.value);
      } else {
        const clips = JSON.parse(localStorage.getItem('clipboard') || '[]');
        const filtered =clips.filter(clip => clip.name !== item.name);
        localStorage.setItem('clipboard', JSON.stringify(filtered));
        setRemoveMode(false);
      }
    }} />;
  });
  const timers = clipboardData.filter(item => item.type === 'timer').map(item => {
    const newTimerDate = new Date(item.value.year,item.value.month-ONE,item.value.day,item.value.hour,item.value.minute,item.value.second);
    return (
      <div key={item.name} onClick={() => {
        if(removeMode) {
          const clips = JSON.parse(localStorage.getItem('clipboard') || '[]');
          const filtered =clips.filter(clip => clip.name !== item.name);
          localStorage.setItem('clipboard', JSON.stringify(filtered));
          setRemoveMode(false);
        }
      }}>
        <DisplayTimer label={item.name} date={newTimerDate} />
      </div>
    );
  });

  return (
    <div>
      <div id="quick-clipboard-add-new-container" className='quick-clipboard-add-new-container quick-clipboard-add-new-container-active'>
        {toggleClip && <div className="quick-clipboard-add-form" >
          <Text label='Name' selected={copyName} onChange={({selected}) => { setCopyName(selected); }} />
          <TextArea label="Value" selected={copyContent} onChange={({ selected }) => { setCopyContent(selected); }}/>
          <button className="quick-clipboard-submit-btn quick-clipboard-add-btn" onClick={
            () => {
              if(copyName && copyContent) {
                const clip = JSON.parse(localStorage.getItem('clipboard') || '[]');
                clip.push({ name: copyName, value: copyContent, type: 'copy' });
                localStorage.setItem('clipboard', JSON.stringify(clip));
                setToggleClip(false);
              }
            }
          }>Submit</button>
        </div>}
        {toggleTimer && <div className="quick-clipboard-add-form">
          <div>
            <Text label='Name' selected={copyName} onChange={({selected}) => { setCopyName(selected); }} />
          </div>
          <div id="timer-fields-date">
            <Text label='Month' selected={month} onChange={({selected}) => { setMonth(selected); }} />
            <Text label='Day' selected={day} onChange={({selected}) => { setDay(selected); }} />
            <Text label='Year' selected={year} onChange={({selected}) => { setYear(selected); }} />
          </div>
          <div id="timer-fields-clock">
            <Text label='Hour' selected={hour} onChange={({selected}) => { setHour(selected); }} />
            <Text label='Minute' selected={minute} onChange={({selected}) => { setMinute(selected); }} />
            <Text label='Second' selected={second} onChange={({selected}) => { setSecond(selected); }} />
            <Switch data={[{ label: 'am' }, { label: 'pm'}]} switchIndex={amOrPmMode} onToggleSwitch={(index) => { setAmOrPmMode(index);}} />
          </div>
          <button className="quick-clipboard-submit-btn quick-clipboard-add-btn" onClick={
            () => {
              if(copyName) {
                const parsedHour = amOrPmMode ? Number(hour) + TWELVE : Number(hour);
                const timerContent = { month: Number(month), day: Number(day), year: Number(year), hour: parsedHour, minute: Number(minute), second: Number(second) };
                const clip = JSON.parse(localStorage.getItem('clipboard') || '[]');
                clip.push({ name: copyName, value: timerContent, type: 'timer' });
                localStorage.setItem('clipboard', JSON.stringify(clip));
                setToggleTimer(false);
              }
            }
          }>Submit</button>
        </div>}
      </div>
      <Button label='Add Clip' classColor='primary' onClick={() => { setToggleClip(!toggleClip); setToggleTimer(false);}} />
      <Button label='Add Timer' classColor='primary' onClick={() => { setToggleTimer(!toggleTimer); setToggleClip(false);}} />
      <Button label='Remove' classColor='secondary' onClick={() => { setRemoveMode(!removeMode); }} />
      {copyButtons}
      {timers}
    </div>
  );
};

export default HomeFooter;

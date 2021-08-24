import React, { useState } from 'react';
import Button from 'components/button';
import { DisplayTimer } from 'components/list/List';
import { copyToClipboard } from 'helper/copy';
import { ClipboardFormTimer, ClipboardFormCopy } from 'components/ClipboardForm';

const ZERO = 0;
const ONE = 1;
const TWELVE = 12;

const HomeFooter = () => {
  const [toggleClip, setToggleClip] = useState(false);
  const [toggleTimer, setToggleTimer] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);

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
      <div className='homefooter-form'>
        <div className='homefooter-form__container'>
          {toggleClip && <ClipboardFormCopy onChange={
            ({name, content}) => {
              const clip = JSON.parse(localStorage.getItem('clipboard') || '[]');
              clip.push({ name, value: content, type: 'copy' });
              localStorage.setItem('clipboard', JSON.stringify(clip));
              setToggleClip(false);
            }
          }/>}
          {toggleTimer && <ClipboardFormTimer onChange={({ name, content}) => {
            const clip = JSON.parse(localStorage.getItem('clipboard') || '[]');
            clip.push({ name, value: content, type: 'timer' });
            localStorage.setItem('clipboard', JSON.stringify(clip));
            setToggleTimer(false);
          }} />}
        </div>
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

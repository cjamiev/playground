import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDirectory, loadFile, writeFile } from './homeActions';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Button from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import Switch from 'components/switch';
import { DisplayTimer } from 'components/list/List';
import { copyToClipboard } from 'helper/copy';
import { sortByDelimiter, sortDescendingByDelimiter } from 'sort';
import { isJSONString } from 'type-check';
import './home.css';

const ZERO = 0;
const ONE = 1;
const DELIMITER_TYPES = [
  { label:'comma', value: ',', selected: true },
  { label:'space', value: ' ', selected: false },
  { label:'new line', value: '\n', selected: false }
];

const Home = () => {
  const today = new Date();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [delimiters, setDelimiters] = useState(DELIMITER_TYPES);
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [toggleClip, setToggleClip] = useState(false);
  const [toggleTimer, setToggleTimer] = useState(false);
  const [copyName, setCopyName] = useState('');
  const [copyContent, setCopyContent] = useState('');
  const [month, setMonth] = useState(today.getMonth()+ONE);
  const [day, setDay] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [hour, setHour] = useState((today.getHours()+ONE)%12);
  const [minute, setMinute] = useState(ZERO);
  const [second, setSecond] = useState(ZERO);
  const [amOrPmMode, setAmOrPmMode] = useState(today.getHours()+ ONE - 12 > ZERO ? ONE : ZERO);
  const [removeMode, setRemoveMode] = useState(false);
  const dispatch = useDispatch();
  const { directory, file, error, result } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(loadDirectory());
  }, [dispatch]);

  useEffect(() => {
    if(error.message) {
      dispatch(createAlert({ content: error.message, status: 'error' }));
    }
    if(result.message) {
      dispatch(createAlert({ content: result.message, status: 'success' }));
    }
  }, [dispatch, error.message, result.message]);

  useEffect(() => {
    setContent(file);
  }, [file]);

  const directoryFilesName = directory.filter(item => item.includes('.')).map(item => {
    return <Button key={item} label={item} onClick={() => { setName(item); dispatch(loadFile(item));}} />;
  });

  const selectedDelimiter = delimiters.find(item => item.selected);
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
        }
      }}>
        <DisplayTimer label={item.name} date={newTimerDate} />
      </div>
    );
  });

  const footerComponent = () => {
    return (
      <div>
        <div id="quick-clipboard-add-new-container" className='quick-clipboard-add-new-container quick-clipboard-add-new-container-active'>
          {toggleClip && <div className="quick-clipboard-add-form" >
            <Text label='Name' selected={copyName} onChange={({selected}) => { setCopyName(selected); }} />
            <TextArea label="Value" selected={copyContent} onChange={({ selected }) => { setCopyContent(selected); }}/>
            <button className="quick-clipboard-submit-btn quick-clipboard-add-btn" onClick={
              () => {
                const clip = JSON.parse(localStorage.getItem('clipboard') || '[]');
                clip.push({ name: copyName, value: copyContent, type: 'copy' });
                localStorage.setItem('clipboard', JSON.stringify(clip));
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
                const parsedHour = amOrPmMode ? Number(hour) + 12 : Number(hour);
                const timerContent = { month: Number(month), day: Number(day), year: Number(year), hour: parsedHour, minute: Number(minute), second: Number(second) };
                const clip = JSON.parse(localStorage.getItem('clipboard') || '[]');
                clip.push({ name: copyName, value: timerContent, type: 'timer' });
                localStorage.setItem('clipboard', JSON.stringify(clip));
              }
            }>Submit</button>
          </div>}
        </div>
        <Button label='Add Clip' onClick={() => { setToggleClip(!toggleClip); setToggleTimer(false);}} />
        <Button label='Add Timer' onClick={() => { setToggleTimer(!toggleTimer); setToggleClip(false);}} />
        <Button label='Remove' onClick={() => { setRemoveMode(!removeMode); }} />
        {copyButtons}
        {timers}
      </div>
    );
  };

  return (
    <Page
      sidePanelContent={
        <div className="home__sidepanel">
          {directoryFilesName}
        </div>
      }
      footerComponent={footerComponent()}
    >
      <div className="home__btns">
        <Text placeholder='Enter File Name' selected={name} onChange={({selected}) => { setName(selected); }} />
        <Button label='Save' onClick={() => { dispatch(writeFile(name, content)); }} />
        <Button label='Copy' onClick={() => { copyToClipboard(content); }} />
        <Button label='Validate' onClick={() => {
          dispatch(dismissAlert());
          const isValid = isJSONString(content);
          const message = isValid ? 'Is Valid JSON' : 'Is NOT Valid JSON';
          const status = isValid ? 'success' : 'error';
          dispatch(createAlert({ content: message, status }));
        }} />
        <Button label='Sort Asc' onClick={() => { setContent(sortByDelimiter(content, selectedDelimiter.value)); }} />
        <Button label='Sort Desc' onClick={() => { setContent(sortDescendingByDelimiter(content, selectedDelimiter.value)); }} />
        <Button label='Split' onClick={() => { setContent(content.split(selectedDelimiter.value).join('\n')); }} />
        <Button label='Join' onClick={() => { setContent(content.split('\n').join(selectedDelimiter.value)); }} />
        <Button label='Trim' onClick={() => { setContent(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' ')); }} />
        <Dropdown label={`Delimiter: ${selectedDelimiter.label}`} values={delimiters} onChange={({ values }) => { setDelimiters(values); }} />
        <Text placeholder='Text to search' selected={find} onChange={({selected}) => { setFind(selected); }} />
        <Text placeholder='Text to replace' selected={replace} onChange={({selected}) => { setReplace(selected); }} />
        <Button label='Replace All' onClick={() => {
          const regex = new RegExp(find, 'gm');
          setContent(content.replace(regex, replace));
        }} />
      </div>
      <TextArea fullPage selected={content} onChange={({ selected }) => { setContent(selected); }}/>
    </Page>
  );
};

export default Home;

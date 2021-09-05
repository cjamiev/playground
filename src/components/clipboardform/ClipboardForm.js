import React, { useEffect, useState } from 'react';
import Text from 'components/form/Text';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import { TimerForm, ValueForm } from 'components/clipboardform';
import List, { DisplayContent } from 'components/list';
import { TYPE } from 'constants/type';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';

const ZERO = 0;
const ONE = 1;
const CLIPBOARD_TYPES = [
  { label: TYPE.COPY, selected: true },
  { label: TYPE.COMMAND, selected: false },
  { label: TYPE.LINK, selected: false },
  { label: TYPE.TEXT, selected: false },
  { label: TYPE.TIMER, selected: false }
];

const ClipboardList = ({ items, removeItem, moveItemUp, moveItemDown }) => {
  return items.map(({ type, label, value }, index) => (
    <div key={`${label}-${index}`}>
      <DisplayContent key={`${type}-${label}-${value}`} type={type} label={label} value={value} />
      <Button label="Remove" onClick={() => { removeItem(index); }} />
      <Button label="Up" onClick={() => { moveItemUp(index); }} />
      <Button label="Down" onClick={() => { moveItemDown(index);}} />
    </div>
  ));
};

const ClipboardForm = ({ clipboard }) => {
  const CLIPBOARD_KEYS = Object.keys(clipboard).map(filename => {
    return { label: filename, selected: false };
  });
  const [existingKeys, setExistingKeys] = useState(CLIPBOARD_KEYS);
  const [existingTitles, setExistingTitles] = useState([]);
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const [types, setTypes] = useState(CLIPBOARD_TYPES);
  const [entry, setEntry] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(ZERO);
  const [data, setData] = useState([]);

  useEffect(() => {
    const selectedKey = existingKeys.find(item => item.selected);
    if(selectedKey) {
      const titleList = clipboard[selectedKey.label].map(item => {
        return { label: item.title, selected: false };
      });
      setKey(selectedKey.label);
      setExistingTitles(titleList);
    }
  }, [clipboard, title, existingKeys]);

  useEffect(() => {
    const selectedKey = existingKeys.find(item => item.selected);
    const selectedTitle = existingTitles.find(item => item.selected);
    if(selectedTitle) {
      const selectedData = clipboard[selectedKey.label].find(item => item.title === selectedTitle.label).data;
      setTitle(selectedTitle.label);
      setData(selectedData);
    }
  }, [clipboard, title, existingKeys, existingTitles]);

  const removeItem = selectedIndex => {
    const updatedItems = entry.filter((_, index) => index !== selectedIndex);

    setEntry(updatedItems);
  };

  const moveItemUp = selectedIndex => {
    const foundIndex = entry.findIndex((_, index) => index === selectedIndex);
    const updatedItems = decrementElementIndex(entry, foundIndex);

    setEntry(updatedItems);
  };

  const moveItemDown = selectedIndex => {
    const foundIndex = entry.findIndex((_, index) => index === selectedIndex);
    const updatedItems = incrementElementIndex(entry, foundIndex);

    setEntry(updatedItems);
  };

  const handleClickEntry = (selectedIndex, selectedEntry) => {
    setCurrentIndex(selectedIndex);
    setEntry(selectedEntry);
  };

  const selectedType = types.find(item => item.selected);
  const addLabel = data[currentIndex] ? 'Update' : 'Add';

  return (
    <div className="flex--horizontal">
      <div className="container--center">
        <h2>Clipboard Form</h2>
        <Dropdown label='Existing Key' values={existingKeys} onChange={({ values }) => { setExistingKeys(values); }} />
        { existingTitles.length > ZERO && <Dropdown label='Existing Title' values={existingTitles} onChange={({ values }) => { setExistingTitles(values); }} />}
        <Text label='Key' selected={key} onChange={({selected}) => { setKey(selected); }} />
        <Text label='Title' selected={title} onChange={({selected}) => { setTitle(selected); }} />
        <Button label={addLabel} classColor='secondary' onClick={
          () => {
            if(entry.length > ZERO) {
              const updatedData = data[currentIndex]
                ? data.map((item, index) => {
                  if(index === currentIndex) {
                    return entry;
                  }
                  return item;
                })
                : [...data, entry];
              setEntry([]);
              setData(updatedData);
              setCurrentIndex(updatedData.length);
            }
          }
        } />
        <Button label='Delete' classColor='secondary' onClick={
          () => {
            setEntry([]);
            setData(data.filter((item, indx) => indx !== currentIndex));
          }
        } />
        <Dropdown label='Type' values={types} onChange={({ values }) => { setTypes(values); }} />
        {selectedType.label === TYPE.TIMER
          ? <TimerForm onChange={({ name, content}) => {
            const newDate = new Date(content.year,content.month-ONE,content.day,content.hour,content.minute,content.second);

            setEntry([...entry, { label: name, value: newDate.toString(), type: selectedType.label }]);
          }} />
          : <ValueForm type={selectedType} onChange={
            ({name, content}) => {
              setEntry([...entry, { label: name, value: content, type: selectedType.label }]);
            }
          }/>
        }
      </div>
      <div className="container--center">
        <h2>Entry {currentIndex + ONE}</h2>
        <ClipboardList
          items={entry}
          removeItem={removeItem}
          moveItemUp={moveItemUp}
          moveItemDown={moveItemDown}
        />
      </div>
      <div className="container--center">
        <h2>Data</h2>
        <List key={title} header={title} data={data} handleClick={handleClickEntry}/>
      </div>
    </div>
  );
};

export default ClipboardForm;
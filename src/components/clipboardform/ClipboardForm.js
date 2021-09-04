import React, { useState } from 'react';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
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

const ClipboardForm = () => {
  const [title, setTitle] = useState('');
  const [types, setTypes] = useState(CLIPBOARD_TYPES);
  const [entry, setEntry] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(ZERO);
  const [data, setData] = useState([]);

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
  const addLabel = data[currentIndex] ? 'Update Entry' : 'Add New Entry';

  return (
    <div className="flex-container">
      <div className="container--center">
        <h2>Clipboard Form</h2>
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
        <Button label='Remove Entry' classColor='secondary' onClick={
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
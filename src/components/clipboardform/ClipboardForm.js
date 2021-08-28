import React, { useState } from 'react';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import { TimerForm, ValueForm } from 'components/ClipboardForm';
import { DisplayContent } from 'components/list/List';
import { TYPE } from 'constants/type';
import {
  decrementElementIndex,
  incrementElementIndex,
  swapArrayElementPositions
} from 'arrayHelper';

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

  const selectedType = types.find(item => item.selected);

  return (
    <div className="container--center">
      <h2>Clipboard Form</h2>
      <Text label='Name' selected={name} onChange={({selected}) => { setTitle(selected); }} />
      <Dropdown label={`Type: ${selectedType.label}`} values={types} onChange={({ values }) => { setTypes(values); }} />
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
      <Button label='Add New Entry' classColor='secondary' onClick={
        () => {
          setEntry([]);
          setData([...data, entry]);
        }
      } />
      <Button label='Submit' classColor='primary' onClick={
        () => {
          console.log('data', data);
        }
      } />
      <ClipboardList
        items={entry}
        removeItem={removeItem}
        moveItemUp={moveItemUp}
        moveItemDown={moveItemDown}
      />
    </div>
  );
};

export default ClipboardForm;
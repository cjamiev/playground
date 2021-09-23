import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Text from 'components/form/Text';
import Dropdown from 'components/form/Dropdown';
import Button, { IconButton } from 'components/button';
import TimerForm from 'components/form/TimerForm';
import ValueForm from 'components/form/ValueForm';
import CommandForm from 'components/form/CommandForm';
import List, { DisplayContent } from 'components/list';
import Table from 'components/table';
import { updateClipboard } from 'routes/clipboard/clipboardActions';
import { TYPE } from 'constants/type';
import { ICON_TYPES } from 'constants/icon';
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

const renderCells = ({ entry, removeItem, moveItemUp, moveItemDown }) => {
  return entry.map(({ type, label, value }, index) => (
    <tr className='flex--horizontal' key={`${label}-${index}`} data-testid={entry.label}>
      <td className='flex--two'><div className='horizontal-center'><DisplayContent key={`${type}-${label}-${value}`} type={type} label={label} value={value} /></div></td>
      <td className='flex--three'>
        <IconButton type={ICON_TYPES.TRASH} onClick={() => { removeItem(index); }} />
        <IconButton type={ICON_TYPES.UP_ARROW} onClick={() => { moveItemUp(index); }} />
        <IconButton type={ICON_TYPES.DOWN_ARROW} onClick={() => { moveItemDown(index);}} />
      </td>
    </tr>
  ));
};

const ClipboardForm = ({ clipboard }) => {
  const dispatch = useDispatch();
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
      setCurrentIndex(selectedData.length);
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

  const renderForm = (type) => {
    if(selectedType.label === TYPE.TIMER) {
      return (<TimerForm
        onChange={({ name, content}) => {
          const newDate = new Date(content.year,content.month-ONE,content.day,content.hour,content.minute,content.second);

          setEntry([...entry, { label: name, value: newDate.toString(), type: selectedType.label }]);
        }}
        value={defaultValue}
      />);
    }
    else if(selectedType.label === TYPE.COMMAND) {
      return (<CommandForm onChange={
        ({name, content}) => {
          setEntry([...entry, { label: name, value: content, type: selectedType.label }]);
        }
      }/>);
    }
    else {
      return (<ValueForm type={selectedType} onChange={
        ({name, content}) => {
          setEntry([...entry, { label: name, value: content, type: selectedType.label }]);
        }
      }/>);
    }


  };

  const selectedType = types.find(item => item.selected);
  const addLabel = data[currentIndex] ? 'Update' : 'Add';
  const defaultValue = { name: '', time: new Date()};

  const renderFormSection = () => {
    return (
      <div className='container--center flex--one'>
        <h2>Form</h2>
        <Dropdown label='Existing Key' values={existingKeys} onChange={({ values }) => { setExistingKeys(values); }} />
        { existingTitles.length > ZERO && <Dropdown label='Existing Title' values={existingTitles} onChange={({ values }) => { setExistingTitles(values); }} />}
        <Text label='Key' selected={key} onChange={({selected}) => { setKey(selected); }} />
        <Text label='Title' selected={title} onChange={({selected}) => { setTitle(selected); }} />
        <Dropdown label='Type' values={types} onChange={({ values }) => { setTypes(values); }} />
        {renderForm(selectedType)}
      </div>
    );
  };

  const renderEntrySection = () => {
    return (
      <div className='container--center flex--three'>
        <h2>Entry #{currentIndex + ONE}</h2>
        <Button label={addLabel} classColor='primary' onClick={
          () => {
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
        } />
        <Button label='Delete' classColor='primary' onClick={
          () => {
            setEntry([]);
            setData(data.filter((item, indx) => indx !== currentIndex));
          }
        } />
        {entry.length > ZERO && <Table headers={[{label:'Clip', className:'flex--two'}, {label:'Actions', className:'flex--three'}]} body={renderCells({ entry, removeItem, moveItemUp, moveItemDown})} />}
      </div>
    );
  };

  const renderDataSection = () => {
    return (
      <div className='container--center flex--one'>
        <h2>Data</h2>
        {key && title && <Button label='Submit' classColor='primary' onClick={
          () => {
            const section = clipboard[key] || [];
            const filteredSection = section.filter(item => item.title !== title);
            const updatedSection = [...filteredSection, { title, data }];

            const content = {...clipboard, [key] : updatedSection };

            dispatch(updateClipboard(content));
          }
        } />}
        {clipboard.hasOwnProperty(key) && title && <Button label='Delete' classColor='primary' onClick={
          () => {
            const updatedSection = clipboard[key].filter(item => (item.title !== title));

            const content = {...clipboard, [key] : updatedSection };

            dispatch(updateClipboard(content));
            setEntry([]);
            setData([]);
          }
        } />}
        <List key={title} header={title} data={data} handleClick={handleClickEntry}/>
      </div>
    );
  };

  return (
    <div className='flex--horizontal'>
      {renderFormSection()}
      {entry.length > ZERO && renderEntrySection()}
      {data.length > ZERO && renderDataSection()}
    </div>
  );
};

export default ClipboardForm;
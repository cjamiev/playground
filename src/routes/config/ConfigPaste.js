import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import Table from 'components/table';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import { ICON_TYPES } from 'constants/icon';

const pasteTableHeaders = [
  { label: 'Paste', className: 'flex--four' },
  { label: 'Description', className: 'flex--two' },
  { label: 'Action', className: 'flex--one'}
];

const ConfigPaste = ({configPaste, onChange}) => {
  const dispatch = useDispatch();
  const [newPaste, setNewPaste] = useState({ label: '', value: ''});
  const [pasteConfiguration, setPasteConfiguration] = useState([]);

  useEffect(() => {
    setPasteConfiguration(configPaste);
  },[configPaste]);

  const renderPasteCells = () => {
    return pasteConfiguration.map(pasteItem => {
      return (
        <tr key={pasteItem.value} className="flex--horizontal">
          <td className="flex--four show-on-active"><span className="hide">{pasteItem.value}</span></td>
          <td className="flex--two">
            <Text
              placeholder={pasteItem.label}
              selected={pasteItem.label}
              onChange={({ selected }) => {
                const updatedPasteConfig = pasteConfiguration.map(item => {
                  if(item.value === pasteItem.value) {
                    return {
                      ...item,
                      label: selected
                    };
                  }

                  return item;
                });

                setPasteConfiguration(updatedPasteConfig);
              }}
            />
          </td>
          <td className="flex--one">
            <IconButton type={ICON_TYPES.TRASH} onClick={() => {
              const updatedPasteConfig = pasteConfiguration.filter(item => item.value !== pasteItem.value);

              onChange(updatedPasteConfig);
            }} />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Paste Configuration </h2>
      <div className="container--center">
        <Table
          headers={pasteTableHeaders}
          body={renderPasteCells(global.pastes)}
        />
        <Button
          classColor="primary"
          label="Update Paste"
          onClick={() => {
            onChange(pasteConfiguration);
          }}
        />
        <Text
          placeholder='Paste'
          selected={newPaste.value}
          onChange={({ selected }) => {
            setNewPaste({ label: newPaste.label, value: selected});
          }}
        />
        <Text
          placeholder='Description'
          selected={newPaste.label}
          onChange={({ selected }) => {
            setNewPaste({ label: selected, value: newPaste.value});
          }}
        />
        <Button
          classColor="primary"
          label="Add Paste"
          onClick={() => {
            if(newPaste.label && newPaste.value) {
              const updatedPaste = [newPaste].concat(pasteConfiguration);

              setNewPaste({ label: '', value: ''});
              onChange(updatedPaste);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ConfigPaste;

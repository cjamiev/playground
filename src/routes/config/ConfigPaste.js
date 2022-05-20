import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import { TrashSVG } from 'components/icons/TrashSVG';
import { Table } from './ConfigTable';
import {
  SCTableCell,
  SCTableCellIcon,
  SCTableCellSvg,
  SCTableCellText,
  SCTableHidden,
  SCTableOverlayText
} from './styles';

const pasteTableHeaders = [
  { label: 'Paste' },
  { label: 'Description' },
  { label: 'Action' }
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
        <tr key={pasteItem.value}>
          <SCTableCell isFirstCell isClickable>
            <SCTableHidden>{pasteItem.value}</SCTableHidden>
            <SCTableOverlayText>Click To See</SCTableOverlayText>
          </SCTableCell>
          <SCTableCell>
            <SCTableCellText>
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
            </SCTableCellText>
          </SCTableCell>
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label='Delete'
              width="45"
              height="53"
              viewBox="0 0 53 53">
              <TrashSVG
                transform={'scale(0.6) translate(35,-2)'}
                onClick={() => {
                  const updatedPasteConfig = pasteConfiguration.filter(item => item.value !== pasteItem.value);

                  onChange(updatedPasteConfig);
                }} />
            </SCTableCellSvg>
          </SCTableCellIcon>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Paste </h2>
      <div>
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

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
  SCTableOverlayText,
  SCCreateFormFieldSet
} from './styles';

const pasteTableHeaders = [
  { label: 'Description' },
  { label: 'Paste' },
  { label: 'Action' }
];
const ZERO = 0;

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
          <SCTableCell isFirstCell><span>{pasteItem.label}</span></SCTableCell>
          <SCTableCell isClickable>
            <SCTableHidden>{pasteItem.value}</SCTableHidden>
            <SCTableOverlayText>Click To See</SCTableOverlayText>
          </SCTableCell>
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label='Delete'
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                const updatedPasteConfig = pasteConfiguration.filter(item => item.value !== pasteItem.value);

                onChange(updatedPasteConfig);
              }}
            >
              <TrashSVG transform={'scale(0.6) translate(35,-2)'} />
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
        {pasteConfiguration.length > ZERO ? <Table
          headers={pasteTableHeaders}
          body={renderPasteCells()}
        /> : <span> No Entries Found </span>}
        <form>
          <SCCreateFormFieldSet>
            <legend>Create New Copy/Paste</legend>
            <Text
              placeholder='Description'
              selected={newPaste.label}
              onChange={({ selected }) => {
                setNewPaste({ label: selected, value: newPaste.value});
              }}
            />
            <Text
              placeholder='Paste'
              selected={newPaste.value}
              onChange={({ selected }) => {
                setNewPaste({ label: newPaste.label, value: selected});
              }}
            />
            <Button
              classColor="primary"
              label="Submit"
              onClick={() => {
                if(newPaste.label && newPaste.value) {
                  const updatedPaste = [newPaste].concat(pasteConfiguration);

                  setNewPaste({ label: '', value: ''});
                  onChange(updatedPaste);
                }
              }}
            />
          </ SCCreateFormFieldSet>
        </form>
      </div>
    </div>
  );
};

export default ConfigPaste;

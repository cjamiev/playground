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

const copyTableHeaders = [
  { label: 'Description' },
  { label: 'Value' },
  { label: 'Action' }
];
const ZERO = 0;

const ConfigCopy = ({configCopy, onChange}) => {
  const dispatch = useDispatch();
  const [newCopy, setNewCopy] = useState({ label: '', value: ''});
  const [copyConfiguration, setCopyConfiguration] = useState([]);

  useEffect(() => {
    setCopyConfiguration(configCopy);
  },[configCopy]);

  const renderCopyCells = () => {
    return copyConfiguration.map(copyItem => {
      return (
        <tr key={copyItem.value}>
          <SCTableCell isFirstCell><span>{copyItem.label}</span></SCTableCell>
          <SCTableCell isClickable>
            <SCTableHidden>{copyItem.value}</SCTableHidden>
            <SCTableOverlayText>Click To See</SCTableOverlayText>
          </SCTableCell>
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label='Delete'
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                const updatedCopyConfig = copyConfiguration.filter(item => item.value !== copyItem.value);

                onChange(updatedCopyConfig);
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
      <h2> Copy </h2>
      <div>
        {copyConfiguration.length > ZERO ? <Table
          headers={copyTableHeaders}
          body={renderCopyCells()}
        /> : <span> No Entries Found </span>}
        <form>
          <SCCreateFormFieldSet>
            <legend>Create New Copy/Paste</legend>
            <Text
              placeholder='Description'
              selected={newCopy.label}
              onChange={({ selected }) => {
                setNewCopy({ label: selected, value: newCopy.value});
              }}
            />
            <Text
              placeholder='Copy'
              selected={newCopy.value}
              onChange={({ selected }) => {
                setNewCopy({ label: newCopy.label, value: selected});
              }}
            />
            <Button
              classColor="primary"
              label="Submit"
              onClick={() => {
                if(newCopy.label && newCopy.value) {
                  const updatedCopy = [newCopy].concat(copyConfiguration);

                  setNewCopy({ label: '', value: ''});
                  onChange(updatedCopy);
                }
              }}
            />
          </ SCCreateFormFieldSet>
        </form>
      </div>
    </div>
  );
};

export default ConfigCopy;

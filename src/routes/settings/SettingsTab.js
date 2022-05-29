import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/button';
import Text from 'components/form/Text';
import { TrashSVG } from 'components/icons';
import { updateSettings } from './settingsActions';
import {
  SCTable,
  SCTableHeaderCell,
  SCSettingsWrapper,
  SCTableCell,
  SCTableHidden,
  SCTableOverlayText,
  SCCreateFormFieldSet
} from './styles';

export const SettingsTable = ({ headers, body }) => {
  const renderHeaders = headers.map((item) => {
    return <SCTableHeaderCell key={item.label}>{item.label}</SCTableHeaderCell>;
  });

  return (
    <SCTable>
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{body}</tbody>
    </SCTable>
  );
};

const SettingsTab = ({ settingsData, labels, isHidden = false, onChange }) => {
  const dispatch = useDispatch();
  const [newSettings, setNewSettings] = useState({ label: '', value: '' });
  const [currentSettingsuration, setCurrentSettingsuration] = useState([]);

  useEffect(() => {
    setCurrentSettingsuration(settingsData);
  }, [settingsData]);

  const renderCommandCells = () => {
    return currentSettingsuration.map((item) => {
      return (
        <tr key={item.value}>
          <SCTableCell isFirstCell>
            <span>{item.label}</span>
          </SCTableCell>
          <SCTableCell>
            {isHidden ? (
              <>
                <SCTableOverlayText>Click to see</SCTableOverlayText>
                <SCTableHidden>{item.value}</SCTableHidden>
              </>
            ) : (
              <span>{item.value}</span>
            )}
          </SCTableCell>
          <SCTableCell isIcon>
            <TrashSVG
              transform="scale(0.6) translate(35,-2)"
              width="45"
              onClick={() => {
                const updatedSettingsuration = currentSettingsuration.filter((c) => c.value !== item.value);

                onChange(updatedSettingsuration);
              }}
            />
          </SCTableCell>
        </tr>
      );
    });
  };

  return (
    <div>
      <SCSettingsWrapper>
        <div>
          <SettingsTable headers={labels.tableHeaders} body={renderCommandCells()} />
        </div>
        <form>
          <SCCreateFormFieldSet>
            <legend> {labels.legend} </legend>
            <Text
              placeholder={labels.inputLabel}
              selected={newSettings.label}
              onChange={({ selected }) => {
                setNewSettings({ label: selected, value: newSettings.value, id: currentSettingsuration.length });
              }}
            />
            <Text
              placeholder={labels.inputValue}
              selected={newSettings.value}
              onChange={({ selected }) => {
                setNewSettings({ label: newSettings.label, value: selected, id: currentSettingsuration.length });
              }}
            />
            <Button
              isPrimary
              label="Submit"
              onClick={(e) => {
                e.preventDefault();
                const updatedSettingsuration = [newSettings].concat(currentSettingsuration);

                onChange(updatedSettingsuration);
              }}
            />
          </SCCreateFormFieldSet>
        </form>
      </SCSettingsWrapper>
    </div>
  );
};

export default SettingsTab;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/button';
import Text from 'components/form/Text';
import { TrashSVG } from 'components/icons/TrashSVG';
import { updateConfig } from './configActions';
import {
  SCTable,
  SCTableHeaderCell,
  SCConfigWrapper,
  SCTableCell,
  SCTableCellIcon,
  SCTableCellSvg,
  SCTableHidden,
  SCTableOverlayText,
  SCCreateFormFieldSet
} from './styles';

export const ConfigTable = ({ headers, body }) => {
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

const ConfigTab = ({ configData, labels, isHidden = false, onChange }) => {
  const dispatch = useDispatch();
  const [newConfig, setNewConfig] = useState({ label: '', value: '' });
  const [currentConfiguration, setCurrentConfiguration] = useState([]);

  useEffect(() => {
    setCurrentConfiguration(configData);
  }, [configData]);

  const renderCommandCells = () => {
    return currentConfiguration.map((item) => {
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
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label="Delete"
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                const updatedConfiguration = currentConfiguration.filter((c) => c.value !== item.value);

                onChange(updatedConfiguration);
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
      <SCConfigWrapper>
        <div>
          <ConfigTable headers={labels.tableHeaders} body={renderCommandCells()} />
        </div>
        <form>
          <SCCreateFormFieldSet>
            <legend> {labels.legend} </legend>
            <Text
              placeholder={labels.inputLabel}
              selected={newConfig.label}
              onChange={({ selected }) => {
                setNewConfig({ label: selected, value: newConfig.value, id: currentConfiguration.length });
              }}
            />
            <Text
              placeholder={labels.inputValue}
              selected={newConfig.value}
              onChange={({ selected }) => {
                setNewConfig({ label: newConfig.label, value: selected, id: currentConfiguration.length });
              }}
            />
            <Button
              classColor="primary"
              label="Submit"
              onClick={() => {
                const updatedConfiguration = [newConfig].concat(currentConfiguration);

                onChange(updatedConfiguration);
              }}
            />
          </SCCreateFormFieldSet>
        </form>
      </SCConfigWrapper>
    </div>
  );
};

export default ConfigTab;

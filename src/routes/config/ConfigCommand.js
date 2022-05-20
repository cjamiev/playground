import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import { EyeSVG } from 'components/icons/EyeSVG';
import { Table } from './ConfigTable';
import {
  SCTableCell,
  SCTableCellIcon,
  SCTableCellSvg,
  SCTableCellText
} from './styles';

const commandTableHeaders = [
  { label: 'Q' },
  { label: 'File' },
  { label: 'Description' }
];

const ConfigCommand = ({globalCommands, configCommands, onChange}) => {
  const dispatch = useDispatch();
  const [commandConfiguration, setCommandConfiguration] = useState([]);

  useEffect(() => {
    setCommandConfiguration(configCommands);
  },[configCommands]);

  const renderCommandCells = () => {
    return globalCommands.map(commandname => {
      const matched = commandConfiguration.find(item => item.value === commandname);
      const label = matched ? matched.label : '';
      const handleClick = () => {
        const updatedCommandConfiguration = matched
          ? commandConfiguration.filter(item => item.value !== commandname)
          : [{ label: commandname, value: commandname }].concat(commandConfiguration);

        setCommandConfiguration(updatedCommandConfiguration);
      };

      return (
        <tr key={commandname}>
          <SCTableCellIcon isFirstCell onClick={handleClick}>
            <SCTableCellSvg
              aria-label='Hide or Show'
              width="45"
              height="53"
              viewBox="0 0 53 53">
              <EyeSVG
                conditions={{ showCross: matched}}
                transform={'scale(0.6) translate(12,-5)'}
              />
            </SCTableCellSvg>
          </SCTableCellIcon>
          <SCTableCell><span>{commandname}</span></SCTableCell>
          <SCTableCell>
            {matched ? <SCTableCellText>
              <Text
                placeholder={commandname}
                selected={label}
                onChange={({ selected }) => {
                  const updatedCommandConfiguration = commandConfiguration.map(item => {
                    if(item.value === commandname) {
                      return {
                        ...item,
                        label: selected
                      };
                    }

                    return item;
                  });

                  setCommandConfiguration(updatedCommandConfiguration);
                }}
              />
            </SCTableCellText>: <span>N/A</span>}
          </SCTableCell>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Commands </h2>
      <div>
        <Table
          headers={commandTableHeaders}
          body={renderCommandCells(global.commands)}
        />
        <Button
          classColor="primary"
          label="Update Commands"
          onClick={() => {
            onChange(commandConfiguration);
          }}
        />
      </div>
    </div>
  );
};

export default ConfigCommand;

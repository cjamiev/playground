import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import { Table } from './ConfigTable';
import {
  SCTableCell,
  SCTableCellText
} from './styles';

const commandTableHeaders = [
  { label: 'File' },
  { label: 'Description' }
];

const ConfigCommand = ({configCommands, onChange}) => {
  const dispatch = useDispatch();
  const [commandConfiguration, setCommandConfiguration] = useState([]);

  useEffect(() => {
    setCommandConfiguration(configCommands);
  },[configCommands]);

  const renderCommandCells = () => {
    return commandConfiguration.map(commandname => {
      return (
        <tr key={commandname.value}>
          <SCTableCell><span>{commandname.value}</span></SCTableCell>
          <SCTableCell>
            <SCTableCellText>
              <Text
                selected={commandname.label}
                onChange={({ selected }) => {
                  const updatedCommandConfiguration = commandConfiguration.map(item => {
                    if(item.value === commandname.value) {
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
            </SCTableCellText>
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
          label="Update"
          onClick={() => {
            onChange(commandConfiguration);
          }}
        />
      </div>
    </div>
  );
};

export default ConfigCommand;

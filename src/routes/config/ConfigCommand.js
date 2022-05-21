import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import { Table } from './ConfigTable';
import { SCTableCell } from './styles';

const commandTableHeaders = [{ label: 'Description' }, { label: 'File' }];

const ConfigCommand = ({ configCommands, onChange }) => {
  const dispatch = useDispatch();
  const [commandConfiguration, setCommandConfiguration] = useState([]);

  useEffect(() => {
    setCommandConfiguration(configCommands);
  }, [configCommands]);

  const renderCommandCells = () => {
    return commandConfiguration.map((commandname) => {
      return (
        <tr key={commandname.value}>
          <SCTableCell isFirstCell>
            <span>{commandname.label}</span>
          </SCTableCell>
          <SCTableCell>
            <span>{commandname.value}</span>
          </SCTableCell>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Commands </h2>
      <div>
        <Table headers={commandTableHeaders} body={renderCommandCells(global.commands)} />
      </div>
    </div>
  );
};

export default ConfigCommand;

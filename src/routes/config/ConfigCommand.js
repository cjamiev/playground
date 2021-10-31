import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import Table from 'components/table';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import { ICON_TYPES } from 'constants/icon';

const commandTableHeaders = [
  { label: 'Command', className: 'flex--two' },
  { label: 'Description', className: 'flex--three' },
  { label: 'Should Show?', className: 'flex--one' }
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
        <tr key={commandname} className="flex--horizontal">
          <td className="flex--two">{commandname}</td>
          <td className="flex--three">
            {matched ? <Text
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
            />: 'N/A'}</td>
          <td className="flex--one clickable" onClick={handleClick}>{matched ? 'Yes' : 'No'}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Command Configuration </h2>
      <div className="container--center">
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

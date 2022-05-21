import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/button';
import Text from 'components/form/Text';
import { TrashSVG } from 'components/icons/TrashSVG';
import { updateConfig } from './configActions';
import { Table } from './ConfigTable';
import { SCConfigWrapper, SCTableCell, SCTableCellIcon, SCTableCellSvg, SCCreateFormFieldSet } from './styles';

const commandTableHeaders = [{ label: 'Description' }, { label: 'File' }, { label: 'Delete' }];

const ConfigCommand = ({ configCommands, onChange }) => {
  const dispatch = useDispatch();
  const [newCommand, setNewCommand] = useState({ label: '', value: '' });
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
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label="Delete"
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                const updatedCommand = commandConfiguration.filter((item) => item.value !== commandname.value);

                onChange(updatedCommand);
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
      <h2> Commands </h2>
      <SCConfigWrapper>
        <Table headers={commandTableHeaders} body={renderCommandCells(global.commands)} />
        <form>
          <SCCreateFormFieldSet>
            <legend> Create New Command </legend>
            <Text
              placeholder="Description"
              selected={newCommand.label}
              onChange={({ selected }) => {
                setNewCommand({ label: selected, value: newCommand.value, id: commandConfiguration.length });
              }}
            />
            <Text
              placeholder="File"
              selected={newCommand.value}
              onChange={({ selected }) => {
                setNewCommand({ label: newCommand.label, value: selected, id: commandConfiguration.length });
              }}
            />
            <Button
              classColor="primary"
              label="Submit"
              onClick={() => {
                const updatedCommands = [newCommand].concat(commandConfiguration);

                onChange(updatedCommands);
              }}
            />
          </SCCreateFormFieldSet>
        </form>
      </SCConfigWrapper>
    </div>
  );
};

export default ConfigCommand;

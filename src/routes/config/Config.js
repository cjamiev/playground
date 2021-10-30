import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig } from './configActions';
import Table from 'components/table';
import Button from 'components/button';
import Text from 'components/form/Text';
import Page from 'components/layout';

const headers = [
  { label: 'Command', className: 'flex--two' },
  { label: 'Description', className: 'flex--three' },
  { label: 'Should Show?', className: 'flex--one' }
];

const Config = () => {
  const dispatch = useDispatch();
  const [commandConfig, setCommandConfig] = useState([]);
  const config = useSelector(state => state.config);
  const global = useSelector(state => state.global);

  useEffect(() => {
    if(config.commands) {
      setCommandConfig(config.commands);
    }
  }, [config]);

  const renderCells = (globalCommands, configCommands) => {
    return Object.keys(globalCommands).map(key => {
      const matched = commandConfig.find(item => item.value === globalCommands[key]);
      const isShown = commandConfig.find(item => item.value === globalCommands[key]);
      const label = matched ? matched.label : '';
      const handleClick = () => {
        const updatedCommandConfig = isShown
          ? commandConfig.filter(item => item.value !== globalCommands[key])
          : [{ label: globalCommands[key], value: globalCommands[key] }].concat(commandConfig);
        setCommandConfig(updatedCommandConfig);
      };

      return (
        <tr key={key} className="flex--horizontal">
          <td className="flex--two">{globalCommands[key]}</td>
          <td className="flex--three">
            {isShown ? <Text
              placeholder={globalCommands[key]}
              selected={label}
              onChange={({ selected }) => {
                const updatedCommandConfig = commandConfig.map(item => {
                  if(item.value === globalCommands[key]) {
                    return {
                      ...item,
                      label: selected
                    };
                  }

                  return item;
                });
                setCommandConfig(updatedCommandConfig);
              }}
            />: 'N/A'}</td>
          <td className="flex--one clickable" onClick={handleClick}>{isShown ? 'Yes' : 'No'}</td>
        </tr>
      );
    });
  };

  return (
    <Page>
      <div className="container--center">
        <Table
          headers={headers}
          body={renderCells(global.commands, config.commands)}
        />
      </div>
      <Button
        classColor="secondary"
        label="Save"
        onClick={() => {
          dispatch(updateConfig({ commands: commandConfig }));
        }
        }
      />
    </Page>
  );
};

export default Config;

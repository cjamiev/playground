import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig } from './configActions';
import { loadProject, updateProject } from 'routes/project/projectActions';
import Table from 'components/table';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import Page from 'components/layout';
import { ICON_TYPES } from 'constants/icon';

const commandTableHeaders = [
  { label: 'Command', className: 'flex--two' },
  { label: 'Description', className: 'flex--three' },
  { label: 'Should Show?', className: 'flex--one' }
];

const directoriesTableHeaders = [
  { label: 'Directory', className: 'flex--four' },
  { label: 'Remove', className: 'flex--one' }
];

const Config = () => {
  const dispatch = useDispatch();
  const [newDir, setNewDir] = useState('');
  const [commandConfig, setCommandConfig] = useState([]);
  const { directories, regexes } = useSelector(state => state.project);
  const config = useSelector(state => state.config);
  const global = useSelector(state => state.global);

  useEffect(() => {
    dispatch(loadProject());
  }, [dispatch]);

  useEffect(() => {
    if(config.commands) {
      setCommandConfig(config.commands);
    }
  }, [config]);

  const renderCommandCells = (globalCommands, configCommands) => {
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

  const renderDirectoriesCells = (dirs) => {
    return Object.keys(dirs).map(key => {
      return (
        <tr key={key} className="flex--horizontal">
          <td className="flex--four">{dirs[key]}</td>
          <td className="flex--one">
            <IconButton
              type={ICON_TYPES.TRASH}
              onClick={() => {
                const updatedDirectories = directories.filter(item => item !== dirs[key]);

                dispatch(updateProject({ directories: updatedDirectories, regexes }));
              }}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <Page>
      <div className="container--center">
        <Table
          headers={commandTableHeaders}
          body={renderCommandCells(global.commands, config.commands)}
        />
        <Button
          classColor="secondary"
          label="Save"
          onClick={() => {
            dispatch(updateConfig({ commands: commandConfig }));
          }}
        />
      </div>
      <div className="container--center">
        <div>
          <Text
            placeholder='New Directory'
            selected={newDir}
            onChange={({ selected }) => {
              setNewDir(selected);
            }}
          />
          <Button
            classColor="secondary"
            label="Add Directory"
            onClick={() => {
              const updatedDirectories = [newDir].concat(directories);

              dispatch(updateProject({ directories: updatedDirectories, regexes }));
            }}
          />
        </div>
        <Table
          headers={directoriesTableHeaders}
          body={renderDirectoriesCells(directories)}
        />
      </div>
    </Page>
  );
};

export default Config;

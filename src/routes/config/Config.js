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

const linkTableHeaders = [
  { label: 'Link', className: 'flex--four' },
  { label: 'Description', className: 'flex--two' },
  { label: 'Action', className: 'flex--one'}
];

const directoriesTableHeaders = [
  { label: 'Directory', className: 'flex--four' },
  { label: 'Remove', className: 'flex--one' }
];

const Config = () => {
  const dispatch = useDispatch();
  const [newDir, setNewDir] = useState('');
  const [newLink, setNewLink] = useState({ label: '', value: ''});
  const [configuration, setConfiguration] = useState({ commands: [], links: []});
  const { directories, regexes } = useSelector(state => state.project);
  const config = useSelector(state => state.config);
  const global = useSelector(state => state.global);

  useEffect(() => {
    dispatch(loadProject());
  }, [dispatch]);

  useEffect(() => {
    setConfiguration(config);
  }, [config]);

  const renderCommandCells = (globalCommands) => {
    return globalCommands.map(commandname => {
      const matched = configuration.commands.find(item => item.value === commandname);
      const label = matched ? matched.label : '';
      const handleClick = () => {
        const updatedCommandConfig = matched
          ? configuration.commands.filter(item => item.value !== commandname)
          : [{ label: commandname, value: commandname }].concat(configuration.commands);
        setConfiguration({ ...configuration, commands: updatedCommandConfig});
      };

      return (
        <tr key={commandname} className="flex--horizontal">
          <td className="flex--two">{commandname}</td>
          <td className="flex--three">
            {matched ? <Text
              placeholder={commandname}
              selected={label}
              onChange={({ selected }) => {
                const updatedCommandConfig = configuration.commands.map(item => {
                  if(item.value === commandname) {
                    return {
                      ...item,
                      label: selected
                    };
                  }

                  return item;
                });
                setConfiguration({ ...configuration, commands: updatedCommandConfig });
              }}
            />: 'N/A'}</td>
          <td className="flex--one clickable" onClick={handleClick}>{matched ? 'Yes' : 'No'}</td>
        </tr>
      );
    });
  };

  const renderLinkCells = () => {
    return configuration.links.map(linkItem => {
      return (
        <tr key={linkItem.value} className="flex--horizontal">
          <td className="flex--four">{linkItem.value}</td>
          <td className="flex--two">
            <Text
              placeholder={linkItem.label}
              selected={linkItem.label}
              onChange={({ selected }) => {
                const updatedLinkConfig = configuration.links.map(item => {
                  if(item.value === linkItem.value) {
                    return {
                      ...item,
                      label: selected
                    };
                  }

                  return item;
                });
                setConfiguration({ ...configuration, links: updatedLinkConfig});
              }}
            />
          </td>
          <td className="flex--one">
            <IconButton type={ICON_TYPES.TRASH} onClick={() => {
              const updatedLinkConfig = configuration.links.filter(item => item.value !== linkItem.value);
              const updatedConfiguration = { ...configuration, links: updatedLinkConfig};
              dispatch(updateConfig(updatedConfiguration));
            }} />
          </td>
        </tr>
      );
    });
  };

  const renderDirectoryCells = (dirs) => {
    return dirs.map(filepath => {
      return (
        <tr key={filepath} className="flex--horizontal">
          <td className="flex--four">{filepath}</td>
          <td className="flex--one">
            <IconButton
              type={ICON_TYPES.TRASH}
              onClick={() => {
                const updatedDirectories = directories.filter(item => item !== filepath);

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
          body={renderCommandCells(global.commands)}
        />
        <Table
          headers={linkTableHeaders}
          body={renderLinkCells()}
        />
        <Button
          classColor="primary"
          label="Save"
          onClick={() => {
            dispatch(updateConfig({ ...config, ...configuration }));
          }}
        />
        <div>
          <Text
            placeholder='New Link Value'
            selected={newLink.value}
            onChange={({ selected }) => {
              setNewLink({ label: newLink.label, value: selected});
            }}
          />
          <Text
            placeholder='New Link Label'
            selected={newLink.label}
            onChange={({ selected }) => {
              setNewLink({ label: selected, value: newLink.value});
            }}
          />
          <Button
            classColor="primary"
            label="Add Link"
            onClick={() => {
              if(newLink.label && newLink.value) {
                const updatedLinks = [newLink].concat(configuration.links);

                dispatch(updateConfig({ commands: configuration.commands, links: updatedLinks }));
              }
            }}
          />
        </div>
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
            classColor="primary"
            label="Add Directory"
            onClick={() => {
              const updatedDirectories = [newDir].concat(directories);

              dispatch(updateProject({ directories: updatedDirectories, regexes }));
            }}
          />
        </div>
        <Table
          headers={directoriesTableHeaders}
          body={renderDirectoryCells(directories)}
        />
      </div>
    </Page>
  );
};

export default Config;

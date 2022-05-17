import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig } from './configActions';
import { loadProject, updateProject } from 'routes/project/projectActions';
import ConfigCommand from './ConfigCommand';
import ConfigLink from './ConfigLink';
import ConfigPaste from './ConfigPaste';
import ConfigDirectory from './ConfigDirectory';
import Table from 'components/table';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import Page from 'components/layout';
import { ICON_TYPES } from 'constants/icon';

const directoriesTableHeaders = [
  { label: 'Directory', className: 'flex--four' },
  { label: 'Remove', className: 'flex--one' }
];

const Config = () => {
  const dispatch = useDispatch();
  const [newDir, setNewDir] = useState('');
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

  const handleCommandChange = (updatedCommandConfiguration) => {
    dispatch(updateConfig({ commands: updatedCommandConfiguration, links: config.links, paste: config.paste }));
  };

  const handleLinkChange = (updatedLinkConfiguration) => {
    dispatch(updateConfig({ commands: config.commands, links: updatedLinkConfiguration, paste: config.paste }));
  };

  const handlePasteChange = (updatedPasteConfiguration) => {
    dispatch(updateConfig({ commands: config.commands, links: config.links, paste: updatedPasteConfiguration }));
  };

  const handleDirectoryChange = (updatedDirectories) => {
    dispatch(updateProject({ directories: updatedDirectories, regexes }));
  };

  return (
    <Page>
      <ConfigCommand
        globalCommands={global.commands}
        configCommands={config.commands}
        onChange={handleCommandChange}
      />
      <ConfigLink
        globalLinks={global.links}
        configLinks={config.links}
        onChange={handleLinkChange}
      />
      <ConfigPaste
        configPaste={config.paste}
        onChange={handlePasteChange}
      />
      <ConfigDirectory
        directories={directories}
        onChange={handleDirectoryChange}
      />
    </Page>
  );
};

export default Config;

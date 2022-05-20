import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig } from './configActions';
import { loadProject, updateProject } from 'routes/project/projectActions';
import ConfigCommand from './ConfigCommand';
import ConfigLink from './ConfigLink';
import ConfigPaste from './ConfigPaste';
import ConfigDirectory from './ConfigDirectory';
import Page from 'components/layout';
import { SCTabButtonGroup, SCTabButton } from './styles';

const Config = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('commands');
  const { directories, regexes } = useSelector(state => state.project);
  const config = useSelector(state => state.config);

  useEffect(() => {
    dispatch(loadProject());
  }, [dispatch]);

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
      <SCTabButtonGroup>
        <SCTabButton
          isActive={tab === 'commands'}
          onClick={() => { setTab('commands');}}
        >
          Commands
        </SCTabButton>
        <SCTabButton
          isActive={tab === 'links'}
          onClick={() => { setTab('links');}}
        >
          Links
        </SCTabButton>
        <SCTabButton
          isActive={tab === 'paste'}
          onClick={() => { setTab('paste');}}
        >
          Paste
        </SCTabButton>
        <SCTabButton
          isActive={tab === 'directory'}
          onClick={() => { setTab('directory');}}
        >
          Directory
        </SCTabButton>
      </SCTabButtonGroup>
      {tab === 'commands' && <ConfigCommand
        configCommands={config.commands}
        onChange={handleCommandChange}
      />}
      {tab === 'links' && <ConfigLink
        configLinks={config.links}
        onChange={handleLinkChange}
      />}
      {tab === 'paste' && <ConfigPaste
        configPaste={config.paste}
        onChange={handlePasteChange}
      />}
      {tab === 'directory' && <ConfigDirectory
        directories={directories}
        onChange={handleDirectoryChange}
      />}
    </Page>
  );
};

export default Config;

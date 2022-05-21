import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig } from './configActions';
import { loadProject, updateProject } from 'routes/project/projectActions';
import ConfigTab from './ConfigTab';
import Page from 'components/layout';
import { SCTabButtonGroup, SCTabButton } from './styles';

const commandLabels = {
  title: 'Commands',
  tableHeaders: [{ label: 'Description' }, { label: 'File' }, { label: 'Delete' }],
  legend: 'Create New Command',
  inputLabel: 'Description',
  inputValue: 'File'
};

const linkLabels = {
  title: 'Links',
  tableHeaders: [{ label: 'Description' }, { label: 'URL' }, { label: 'Delete' }],
  legend: 'Create New Link',
  inputLabel: 'Description',
  inputValue: 'URL'
};

const copyLabels = {
  title: 'Copies',
  tableHeaders: [{ label: 'Description' }, { label: 'Value' }, { label: 'Delete' }],
  legend: 'Create New Copy/Paste',
  inputLabel: 'Description',
  inputValue: 'Value'
};

const directoryLabels = {
  title: 'Directories',
  tableHeaders: [{ label: 'Description' }, { label: 'Path' }, { label: 'Delete' }],
  legend: 'Create New Directory',
  inputLabel: 'Description',
  inputValue: 'Path'
};

const Config = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('commands');
  const { directories, regexes } = useSelector((state) => state.project);
  const config = useSelector((state) => state.config);

  useEffect(() => {
    dispatch(loadProject());
  }, [dispatch]);

  const handleCommandChange = (updatedCommandConfiguration) => {
    dispatch(updateConfig({ commands: updatedCommandConfiguration, links: config.links, copy: config.copy }));
  };

  const handleLinkChange = (updatedLinkConfiguration) => {
    dispatch(updateConfig({ commands: config.commands, links: updatedLinkConfiguration, copy: config.copy }));
  };

  const handleCopyChange = (updatedCopyConfiguration) => {
    dispatch(updateConfig({ commands: config.commands, links: config.links, copy: updatedCopyConfiguration }));
  };

  const handleDirectoryChange = (updatedDirectories) => {
    dispatch(updateProject({ directories: updatedDirectories, regexes }));
  };

  return (
    <Page>
      <SCTabButtonGroup>
        <SCTabButton
          isActive={tab === 'commands'}
          onClick={() => {
            setTab('commands');
          }}
        >
          Commands
        </SCTabButton>
        <SCTabButton
          isActive={tab === 'links'}
          onClick={() => {
            setTab('links');
          }}
        >
          Links
        </SCTabButton>
        <SCTabButton
          isActive={tab === 'copy'}
          onClick={() => {
            setTab('copy');
          }}
        >
          Copy
        </SCTabButton>
        <SCTabButton
          isActive={tab === 'directory'}
          onClick={() => {
            setTab('directory');
          }}
        >
          Directory
        </SCTabButton>
      </SCTabButtonGroup>
      {tab === 'commands' && (
        <ConfigTab configData={config.commands} labels={commandLabels} onChange={handleCommandChange} />
      )}
      {tab === 'links' && <ConfigTab configData={config.links} labels={linkLabels} onChange={handleLinkChange} />}
      {tab === 'copy' && <ConfigTab configData={config.copy} labels={copyLabels} onChange={handleCopyChange} />}
      {tab === 'directory' && (
        <ConfigTab configData={directories} labels={directoryLabels} onChange={handleDirectoryChange} />
      )}
    </Page>
  );
};

export default Config;

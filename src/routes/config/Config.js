import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/layout';
import ComponentWrapper from 'components/ComponentWrapper';
import { loadProject, updateProject } from 'routes/project/projectActions';
import ConfigTab from './ConfigTab';
import Tabs from 'components/tabs';
import { updateConfig } from './configActions';
import { commandLabels, linkLabels, copyLabels, directoryLabels } from './data';
import { SCTabButtonGroup, SCTabButton } from './styles';

const Config = () => {
  const dispatch = useDispatch();
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

  const TABS = [
    {
      title: 'Commands',
      component: ComponentWrapper(ConfigTab, {
        configData: config.commands,
        labels: commandLabels,
        onChange: handleCommandChange
      })
    },
    {
      title: 'Links',
      component: ComponentWrapper(ConfigTab, {
        configData: config.links,
        labels: linkLabels,
        onChange: handleLinkChange
      })
    },
    {
      title: 'Copy',
      component: ComponentWrapper(ConfigTab, {
        configData: config.copy,
        labels: copyLabels,
        onChange: handleCopyChange
      })
    },
    {
      title: 'Directories',
      component: ComponentWrapper(ConfigTab, {
        configData: directories,
        labels: directoryLabels,
        onChange: handleDirectoryChange
      })
    }
  ];

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Config;

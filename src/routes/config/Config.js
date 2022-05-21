import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/layout';
import { loadProject, updateProject } from 'routes/project/projectActions';
import { updateConfig } from './configActions';
import ConfigTab from './ConfigTab';
import { commandLabels, linkLabels, copyLabels, directoryLabels, tabs } from './data';
import { SCTabButtonGroup, SCTabButton } from './styles';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;

const Config = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(tabs[ZERO]);
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

  const renderTab = () => {
    if (tab === tabs[ZERO]) {
      return <ConfigTab configData={config.commands} labels={commandLabels} onChange={handleCommandChange} />;
    }
    if (tab === tabs[ONE]) {
      return <ConfigTab configData={config.links} labels={linkLabels} onChange={handleLinkChange} />;
    }
    if (tab === tabs[TWO]) {
      return <ConfigTab configData={config.copy} labels={copyLabels} isHidden={true} onChange={handleCopyChange} />;
    }
    if (tab === tabs[THREE]) {
      return <ConfigTab configData={directories} labels={directoryLabels} onChange={handleDirectoryChange} />;
    }
  };

  return (
    <Page>
      <SCTabButtonGroup>
        {tabs.map((item) => {
          return (
            <SCTabButton
              key={item}
              isActive={tab === item}
              onClick={() => {
                setTab(item);
              }}
            >
              {item}
            </SCTabButton>
          );
        })}
      </SCTabButtonGroup>
      {renderTab()}
    </Page>
  );
};

export default Config;

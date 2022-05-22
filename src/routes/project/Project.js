import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import { loadProject, clearMessage } from './projectActions';
import { getPackageJson } from './package/npmPackageActions';
import { getRemoteUrl, viewBranches, viewStash } from './git/gitActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import Text from 'components/form/Text';
import Dropdown from 'components/form/Dropdown';
import ComponentWrapper from 'components/ComponentWrapper';
import Git from './git';
import NpmPackage from './package';
import Regex from './regex';
import Snippet from './snippet';
import useLocalStorage from 'hooks/useLocalStorage';
import useDebounce from 'hooks/useDebounce';
import { TIME } from 'constants/time';

const DEFAULT_DIR = './';
const LS_DIR_KEY = 'rootDir';
const TWELVE = 12;

const Project = () => {
  const dispatch = useDispatch();
  const [root, setRoot] = useLocalStorage(LS_DIR_KEY, DEFAULT_DIR, false);
  const { directories, regexes, packageJson, message } = useSelector((state) => state.project);
  const [dirKeys, setDirKeys] = useState([]);
  const TABS = [
    { title: 'Git', component: ComponentWrapper(Git, { root }) },
    { title: 'Npm', component: ComponentWrapper(NpmPackage, { root }) },
    { title: 'Regex', component: ComponentWrapper(Regex, { root, directories, regexes }) },
    { title: 'Snippet', component: ComponentWrapper(Snippet, {}) }
  ];
  const debouncedRoot = useDebounce(root, TIME.A_SECOND);

  useEffect(() => {
    const DIR_KEYS = directories.map((item) => {
      return { label: item.label, value: item.value, selected: false };
    });
    setDirKeys(DIR_KEYS);
  }, [directories, root]);

  useEffect(() => {
    dispatch(loadProject());
    dispatch(getRemoteUrl(debouncedRoot));
    dispatch(viewBranches(debouncedRoot));
    dispatch(viewStash(debouncedRoot));
    dispatch(getPackageJson(debouncedRoot));
  }, [dispatch, debouncedRoot]);

  useEffect(() => {
    if (message) {
      const parsedResult = message.replace(/\\r/g, '').split('\n');
      const renderResult = parsedResult.map((item, index) => {
        return <p key={index}>{item}</p>;
      });
      dispatch(
        openGlobalModal({
          title: 'Project Response',
          message: renderResult,
          beforeClose: () => {
            dispatch(clearMessage());
          }
        })
      );
    }
  }, [dispatch, message]);

  return (
    <Page
      sidePanelContent={
        <div className="container--center">
          <Dropdown
            label="Directories"
            values={dirKeys}
            onChange={({ values }) => {
              setRoot(values.find((item) => item.selected).value);
            }}
          />
          <span>{root}</span>
        </div>
      }
    >
      <Tabs data={TABS} />
    </Page>
  );
};

export default Project;

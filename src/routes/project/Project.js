import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import { loadProject, clearMessage } from './projectActions';
import { getPackageJson } from './package/npmPackageActions';
import { getRemoteUrl, viewBranches, viewStash } from './git/gitActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import ComponentWrapper from 'components/ComponentWrapper';
import Git from './git';
import NpmPackage from './package';
import Regex from './regex';
import Snippet from './snippet';
import useLocalStorage from 'hooks/useLocalStorage';
import { SCDirBtnWrapper, SCDirectoryBtn } from './styles';

const DEFAULT_DIR = './';
const LS_DIR_KEY = 'rootDir';

const Project = () => {
  const dispatch = useDispatch();
  const [root, setRoot] = useLocalStorage(LS_DIR_KEY, DEFAULT_DIR, false);
  const { directories, regexes, packageJson, message } = useSelector((state) => state.project);
  const TABS = [
    { title: 'Git', component: ComponentWrapper(Git, { root }) },
    { title: 'Npm', component: ComponentWrapper(NpmPackage, { root }) },
    { title: 'Regex', component: ComponentWrapper(Regex, { root, directories, regexes }) },
    { title: 'Snippet', component: ComponentWrapper(Snippet, {}) }
  ];

  useEffect(() => {
    dispatch(loadProject());
    dispatch(getRemoteUrl(root));
    dispatch(viewBranches(root));
    dispatch(viewStash(root));
    dispatch(getPackageJson(root));
  }, [dispatch, root]);

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
        <SCDirBtnWrapper>
          <h3>Select Project</h3>
          {directories.map((item) => {
            return (
              <SCDirectoryBtn
                key={item.label}
                label={item.label}
                onClick={() => {
                  setRoot(item.value);
                }}
              />
            );
          })}
        </SCDirBtnWrapper>
      }
    >
      <Tabs data={TABS} />
    </Page>
  );
};

export default Project;

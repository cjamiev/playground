import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import { loadProject, clearMessage } from './projectActions';
import { getPackageJson } from './package/npmPackageActions';
import { getRemoteUrl, viewBranches, viewStash } from './git/gitActions';
import { loadSnippetDirectory } from './snippet/snippetActions';
import { CopyFileSVG } from 'components/icons/CopyFileSVG';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import ComponentWrapper from 'components/ComponentWrapper';
import { copyToClipboard } from 'helper/copy';
import Git from './git';
import NpmPackage from './package';
import Regex from './regex';
import Snippet from './snippet';
import useLocalStorage from 'hooks/useLocalStorage';
import { SCDirPath, SCDirSidePanelWrapper, SCDirBtnWrapper, SCDirectoryBtn } from './styles';

const DEFAULT_DIR = './';
const LS_DIR_KEY = 'rootDir';

const Project = () => {
  const dispatch = useDispatch();
  const [root, setRoot] = useLocalStorage(LS_DIR_KEY, DEFAULT_DIR, false);
  const { remoteUrl, directories, regexes, packageJson, message } = useSelector((state) => state.project);
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
    dispatch(loadSnippetDirectory());
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
        <SCDirSidePanelWrapper>
          <h3>Select Project</h3>
          <SCDirPath>
            <div>
              <span>{remoteUrl}</span>
              <svg
                aria-label="Git Remote Url"
                width="45"
                height="53"
                viewBox="0 0 53 53"
                onClick={() => {
                  copyToClipboard(remoteUrl);
                }}
              >
                <CopyFileSVG />
              </svg>
            </div>
            <div>
              <span>{root}</span>
              <svg
                aria-label="Directory Path"
                width="45"
                height="53"
                viewBox="0 0 53 53"
                onClick={() => {
                  copyToClipboard(root);
                }}
              >
                <CopyFileSVG />
              </svg>
            </div>
          </SCDirPath>
          <SCDirBtnWrapper>
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
        </SCDirSidePanelWrapper>
      }
    >
      <Tabs data={TABS} />
    </Page>
  );
};

export default Project;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import {
  getRemoteUrl,
  viewBranches,
  viewStash
} from './projectActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import Text from 'components/form/Text';
import ComponentWrapper from 'components/ComponentWrapper';
import Git from './Git';
import useLocalStorage from 'hooks/useLocalStorage';
import useDebounce from 'hooks/useDebounce';
import { TIME } from 'constants/time';

const DEFAULT_DIR = './';
const LS_DIR_KEY = 'rootDir';

const Project = () => {
  const dispatch = useDispatch();
  const [root, setRoot] = useLocalStorage(LS_DIR_KEY, DEFAULT_DIR, false);
  const { message } = useSelector(state => state.project);
  const TABS = [
    { title: 'Git', component: ComponentWrapper(Git, { root }) }
  ];
  const debouncedRoot = useDebounce(root, TIME.A_SECOND);

  useEffect(() => {
    dispatch(getRemoteUrl(debouncedRoot));
    dispatch(viewBranches(debouncedRoot));
    dispatch(viewStash(debouncedRoot));
  }, [dispatch, debouncedRoot]);

  useEffect(() => {
    if(message) {
      const parsedResult = message.replace(/\\r/g,'').split('\n');
      const renderResult = parsedResult.map((item,index) => {
        return <p key={index}>{item}</p>;
      });
      dispatch(openGlobalModal(
        {
          title: 'Project Response',
          message: renderResult,
          beforeClose: () => {
            dispatch(clearMessage());
          }
        }));
    }
  }, [dispatch, message]);

  return (
    <Page>
      <Text
        label="Root"
        selected={root}
        onChange={({ selected }) => {
          setRoot(selected);
        }}
      />
      <Tabs data={TABS} />
    </Page>
  );
};

export default Project;

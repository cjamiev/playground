import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRemoteUrl,
  deleteBranch,
  selectBranch,
  viewBranches,
  stash,
  selectStash,
  viewStash,
  reset
} from './gitActions';
import Page from 'components/layout';
import Dropdown from 'components/form/Dropdown';
import Button, { IconButton } from 'components/button';
import { ICON_TYPES } from 'constants/icon';
import { copyToClipboard } from 'helper/copy';

const Git = () => {
  const dispatch = useDispatch();
  const [localBranches, setLocalBranches] = useState([]);
  const [localStashes, setLocalStashes] = useState([]);
  const {
    remoteUrl,
    branches,
    stashes,
    message
  } = useSelector((state) => state.git);

  useEffect(() => {
    dispatch(getRemoteUrl());
    dispatch(viewBranches());
    dispatch(viewStash());
  }, [dispatch]);

  useEffect(() => {
    if(branches.length) {
      const dropdownContent = branches.map(item => {
        return { label: item, selected: false };
      });

      setLocalBranches(dropdownContent);
    }
  }, [branches]);

  useEffect(() => {
    if(stashes.length) {
      const dropdownContent = stashes.map(item => {
        return { label: item, selected: false };
      });

      setLocalStashes(dropdownContent);
    }
  }, [stashes]);

  const selectedBranch = localBranches.find(item => item.selected);
  const branchName = selectedBranch ? selectedBranch.label : '';
  const selectedStash = localStashes.find(item => item.selected);
  const stashName = selectedStash ? selectedStash.label : '';

  return (
    <Page>
      <label>Remote Url: {remoteUrl}</label>
      <IconButton
        type={ICON_TYPES.COPY}
        onClick={() => {
          copyToClipboard(remoteUrl);
        }}
      />
      <Dropdown
        label="Branches"
        values={localBranches}
        onChange={({ values }) => {
          setLocalBranches(values);
        }}
      />
      <Dropdown
        label="Stash"
        values={localStashes}
        onChange={({ values }) => {
          setLocalStashes(values);
        }}
      />
      <Button
        label={`Checkout ${branchName}`}
        disabled={!branchName}
        onClick={() => { dispatch(selectBranch(branchName)); }}
      />
      <Button
        label={`Delete ${branchName}`}
        disabled={!branchName}
        onClick={() => { dispatch(deleteBranch(branchName)); }}
      />
      <Button
        label={`Stash ${stashName}`}
        disabled={!stashName}
        onClick={() => { dispatch(selectStash(stashName)); }}
      />
      <Button
        label={'Reset'}
        onClick={() => { dispatch(reset()); }}
      />
    </Page>
  );
};

export default Git;

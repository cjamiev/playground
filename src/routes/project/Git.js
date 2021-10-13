import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import {
  deleteBranch,
  selectBranch,
  createStash,
  selectStash,
  resetBranch,
  clearMessage
} from './projectActions';
import Text from 'components/form/Text';
import Dropdown from 'components/form/Dropdown';
import Button, { IconButton } from 'components/button';
import { ICON_TYPES } from 'constants/icon';
import { copyToClipboard } from 'helper/copy';
import useLocalStorage from 'hooks/useLocalStorage';

const ZERO = 0;
const ONE = 1;

const Git = ({ root }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [localBranches, setLocalBranches] = useState([]);
  const [localStashes, setLocalStashes] = useState([]);
  const {
    remoteUrl,
    branches,
    stashes
  } = useSelector((state) => state.project);

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
  const stashName = selectedStash ? selectedStash.label.split('{')[ONE].charAt(ZERO) : '';

  return (
    <div>
      <label>Remote Url: {remoteUrl}</label>
      <IconButton
        type={ICON_TYPES.COPY}
        onClick={() => {
          copyToClipboard(remoteUrl);
        }}
      />
      <Text
        label="Name"
        selected={name}
        onChange={({ selected }) => {
          setName(selected);
        }}
      />
      <Button
        label={`Create Stash ${name}`}
        disabled={!name}
        onClick={() => { dispatch(createStash(root,name)); }}
      />
      <Dropdown
        label="Branches"
        values={localBranches}
        onChange={({ values }) => {
          setLocalBranches(values);
        }}
      />
      <Dropdown
        label="Stashes"
        values={localStashes}
        onChange={({ values }) => {
          setLocalStashes(values);
        }}
      />
      <Button
        label={`Checkout ${branchName}`}
        disabled={!branchName}
        onClick={() => { dispatch(selectBranch(root,branchName)); }}
      />
      <Button
        label={`Delete ${branchName}`}
        disabled={!branchName}
        onClick={() => { dispatch(deleteBranch(root,branchName)); }}
      />
      <Button
        label={`Switch Stash ${stashName}`}
        disabled={!stashName}
        onClick={() => { dispatch(selectStash(root,stashName)); }}
      />
      <Button
        label={'Reset'}
        onClick={() => { dispatch(resetBranch(root)); }}
      />
    </div>
  );
};

export default Git;

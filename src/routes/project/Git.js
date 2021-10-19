import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalModal } from 'components/global/globalActions';
import {
  viewBranches,
  viewStash,
  deleteBranch,
  createBranch,
  mergeBranch,
  selectBranch,
  createStash,
  deleteStash,
  selectStash,
  resetBranch
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

  const selectedBranch = localBranches.find(item => item.selected);
  const branchName = selectedBranch ? selectedBranch.label : '';
  const selectedStash = localStashes.find(item => item.selected);
  const stashName = selectedStash ? selectedStash.label.split('{')[ONE].charAt(ZERO) : '';

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

  useEffect(() => {
    if(branchName) {
      setName(branchName);
    }
  }, [branchName]);

  return (
    <div>
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
        label="Stashes"
        values={localStashes}
        onChange={({ values }) => {
          setLocalStashes(values);
        }}
      />
      <Text
        placeholder="Name"
        selected={name}
        onChange={({ selected }) => {
          setName(selected);
        }}
      />
      <div className="flex--vertical">
        <div className="flex--horizontal">
          <Button
            label={`Checkout ${branchName}`}
            disabled={!branchName}
            onClick={() => { dispatch(selectBranch(root,branchName)); }}
          />
          <Button
            label={`Delete ${branchName}`}
            disabled={!branchName}
            onClick={() => {
              dispatch(deleteBranch(root,branchName));
              dispatch(viewBranches(root));
            }}
          />
          <Button
            label={`Merge ${name}`}
            disabled={!name}
            onClick={() => { dispatch(mergeBranch(root,name)); }}
          />
          <Button
            label={`Create ${name}`}
            disabled={!name}
            onClick={() => {
              dispatch(createBranch(root,name));
              dispatch(viewBranches(root));
            }}
          />
        </div>
        <div className="flex--horizontal">
          <Button
            label={`Create Stash ${name}`}
            disabled={!name}
            onClick={() => {
              dispatch(createStash(root,name));
              dispatch(viewStash(root));
            }}
          />
          <Button
            label={`Delete Stash ${name}`}
            disabled={!name}
            onClick={() => {
              dispatch(deleteStash(root,name));
              dispatch(viewStash(root));
            }}
          />
          <Button
            label={`Switch Stash ${stashName}`}
            disabled={!stashName}
            onClick={() => { dispatch(selectStash(root,stashName)); }}
          />
        </div>
        <div className="flex--horizontal">
          <Button
            label={'Reset'}
            onClick={() => { dispatch(resetBranch(root)); }}
          />
        </div>
      </div>
    </div>
  );
};

export default Git;

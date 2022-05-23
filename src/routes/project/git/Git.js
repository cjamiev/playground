import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from './gitActions';
import Text from 'components/form/Text';
import Button from 'components/button';
import {
  SCGitPageWrapper,
  SCNameTxt,
  SCBranchesWrapper,
  SCBranchBtnWrapper,
  SCBranchBtn,
  SCFlexWrapper
} from './styles';

const Git = ({ root }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [isBranchMode, setIsBranchMode] = useState(true);
  const { branches, stashes } = useSelector((state) => state.project);

  return (
    <SCGitPageWrapper>
      <SCBranchesWrapper>
        <SCBranchBtnWrapper>
          <h2>Branches</h2>
          {branches.map((item) => {
            return (
              <SCBranchBtn
                key={item}
                onClick={() => {
                  setName(item);
                  setIsBranchMode(true);
                }}
              >
                {item}
              </SCBranchBtn>
            );
          })}
        </SCBranchBtnWrapper>
        <SCBranchBtnWrapper>
          <h2>Stashes</h2>
          {stashes.map((item) => {
            return (
              <SCBranchBtn
                key={item}
                onClick={() => {
                  setName(item);
                  setIsBranchMode(false);
                }}
              >
                {item}
              </SCBranchBtn>
            );
          })}
        </SCBranchBtnWrapper>
      </SCBranchesWrapper>
      <div>
        <SCNameTxt>
          <Text
            placeholder="Name"
            selected={name}
            onChange={({ selected }) => {
              setName(selected);
            }}
          />
        </SCNameTxt>
        <SCFlexWrapper>
          <Button
            label="Checkout"
            disabled={!name || !isBranchMode}
            onClick={() => {
              dispatch(selectBranch(root, name));
            }}
          />
          <Button
            label="Delete"
            disabled={!name || !isBranchMode}
            onClick={() => {
              dispatch(deleteBranch(root, name));
              dispatch(viewBranches(root));
            }}
          />
          <Button
            label="Merge"
            disabled={!name || !isBranchMode}
            onClick={() => {
              dispatch(mergeBranch(root, name));
            }}
          />
          <Button
            label="Create"
            disabled={!name || !isBranchMode}
            onClick={() => {
              dispatch(createBranch(root, name));
              dispatch(viewBranches(root));
            }}
          />
        </SCFlexWrapper>
        <SCFlexWrapper>
          <Button
            label="Create Stash"
            disabled={!name || isBranchMode}
            onClick={() => {
              dispatch(createStash(root, name));
              dispatch(viewStash(root));
            }}
          />
          <Button
            label="Delete Stash"
            disabled={!name || isBranchMode}
            onClick={() => {
              dispatch(
                deleteStash(
                  root,
                  stashes.findIndex((item) => item === name)
                )
              );
              dispatch(viewStash(root));
            }}
          />
          <Button
            label="Switch Stash"
            disabled={!name || isBranchMode}
            onClick={() => {
              dispatch(selectStash(root, name));
            }}
          />
        </SCFlexWrapper>
        <SCFlexWrapper>
          <Button
            label="Reset"
            onClick={() => {
              dispatch(resetBranch(root));
            }}
          />
        </SCFlexWrapper>
      </div>
    </SCGitPageWrapper>
  );
};

export default Git;

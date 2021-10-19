import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDependencyVersions } from './projectActions';
import Button from 'components/button';

const ZERO = 0;
const ONE = 1;

const Package = ({ root }) => {
  const dispatch = useDispatch();
  const { packageJson, versions } = useSelector((state) => state.project);

  return (
    <div className="flex--vertical">
      <div className="flex--horizontal">
        <Button
          label={'Load Versions'}
          onClick={() => { dispatch(getDependencyVersions(root)); }}
        />
      </div>
    </div>
  );
};

export default Package;

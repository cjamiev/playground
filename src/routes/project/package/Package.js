import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runNpmScript, getDependencyVersions, updatePackage } from './packageActions';
import Button from 'components/button';
import Table from 'components/table';
import { noop } from 'helper/noop';
import { updateDependencyVersions } from './helper';

const ZERO = 0;
const ONE = 1;
const headers = [
  { label: 'Modules', className: 'flex--three' },
  { label: 'Current', className: 'flex--one' },
  { label: 'Latest', className: 'flex--one' }
];

const Package = ({ root }) => {
  const dispatch = useDispatch();
  const [selectedDeps, setSelectedDeps] = useState([]);
  const { packageJson, versions } = useSelector((state) => state.project);

  const { name, description, scripts, dependencies, devDependencies } = packageJson;

  const packageCommands = Object.keys(scripts).map(scriptName => {
    return (
      <Button
        key={scriptName}
        label={scriptName}
        classColor="primary"
        onClick={() => {
          dispatch(runNpmScript(root, scriptName));
        }}
      />);
  });

  const renderCells = (entry, v) => {
    return Object.keys(entry).map(key => {
      const depVersion = v ? v[key] : '-';
      const latestVersion = depVersion === entry[key] ? '-': depVersion;
      const hasUpdate = latestVersion !== '-';
      const matched = selectedDeps.find(item => !!item[key]);
      const isClickable = hasUpdate ? ' clickable' : '';
      const isSelected = matched ? ' table--selected' : '';
      const className = `flex--one${isClickable}${isSelected}`;
      const handleClick = hasUpdate ? () => {
        const updatedSelection = matched
          ? selectedDeps.filter(item => !item[key])
          : selectedDeps.concat({ [key]: latestVersion});

        setSelectedDeps(updatedSelection);
      } : noop;

      return (
        <tr key={key} className="flex--horizontal">
          <td className="flex--three">{key}</td>
          <td className="flex--one">{entry[key]}</td>
          <td className={className} onClick={handleClick}>{latestVersion}</td>
        </tr>
      );
    });
  };

  return (
    <div className="flex--horizontal">
      <div className="flex--vertical flex--center flex--one">
        <Button
          label='Load Versions'
          classColor="secondary"
          onClick={() => {
            dispatch(getDependencyVersions(root));
          }}
        />
        <Button
          label='Update Versions'
          classColor="secondary"
          onClick={() => { dispatch(updatePackage(root, updateDependencyVersions(packageJson, selectedDeps))); }}
        />
        {packageCommands}
      </div>
      <div className="container--center flex--five">
        <h2> Dependencies </h2>
        <Table
          headers={headers}
          body={renderCells(dependencies, versions.dependencies)}
        />
        <h2> Dev Dependencies </h2>
        <Table
          headers={headers}
          body={renderCells(devDependencies, versions.devDependencies)}
        />
      </div>
    </div>
  );
};

export default Package;

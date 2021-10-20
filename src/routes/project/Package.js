import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runNpmScript, getDependencyVersions } from './projectActions';
import Button from 'components/button';
import Table from 'components/table';

const ZERO = 0;
const ONE = 1;
const headers = [
  { label: 'Modules', className: 'flex--three' },
  { label: 'Current', className: 'flex--one' },
  { label: 'Latest', className: 'flex--one' }
];

const Package = ({ root }) => {
  const dispatch = useDispatch();
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
      const latestVersion = v ? v[key] : '-';

      return (
        <tr key={key} className="flex--horizontal">
          <td className="flex--three">{key}</td>
          <td className="flex--one">{entry[key]}</td>
          <td className="flex--one">{latestVersion}</td>
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
          onClick={() => { dispatch(getDependencyVersions(root)); }}
        />
        <Button
          label='install'
          classColor="primary"
          onClick={() => {
            dispatch(runNpmScript(root, 'install'));
          }}
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

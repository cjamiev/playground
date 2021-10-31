import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'components/table';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import { ICON_TYPES } from 'constants/icon';

const directoriesTableHeaders = [
  { label: 'Directory', className: 'flex--four' },
  { label: 'Remove', className: 'flex--one' }
];

const Config = ({ directories, onChange }) => {
  const dispatch = useDispatch();
  const [newDir, setNewDir] = useState('');
  const [projectDirectories, setProjectDirectories] = useState([]);

  useEffect(() => {
    setProjectDirectories(directories);
  },[directories]);

  const renderDirectoryCells = () => {
    return projectDirectories.map(filepath => {
      return (
        <tr key={filepath} className="flex--horizontal">
          <td className="flex--four">{filepath}</td>
          <td className="flex--one">
            <IconButton
              type={ICON_TYPES.TRASH}
              onClick={() => {
                const updatedDirectories = projectDirectories.filter(item => item !== filepath);

                onChange(updatedDirectories);
              }}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Link Configuration </h2>
      <div className="container--center">
        <Table
          headers={directoriesTableHeaders}
          body={renderDirectoryCells()}
        />
        <Text
          placeholder='New Directory'
          selected={newDir}
          onChange={({ selected }) => {
            setNewDir(selected);
          }}
        />
        <Button
          classColor="primary"
          label="Add Directory"
          onClick={() => {
            const updatedDirectories = [newDir].concat(projectDirectories);

            onChange(updatedDirectories);
          }}
        />
      </div>
    </div>
  );
};

export default Config;

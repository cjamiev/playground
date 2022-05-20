import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/button';
import Text from 'components/form/Text';
import { TrashSVG } from 'components/icons/TrashSVG';
import { Table } from './ConfigTable';
import {
  SCTableCell,
  SCTableCellIcon,
  SCTableCellSvg,
  SCTableCellText,
  SCTableHidden
} from './styles';

const directoriesTableHeaders = [
  { label: 'Directory' },
  { label: 'Remove' }
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
        <tr key={filepath}>
          <SCTableCell>{filepath}</SCTableCell>
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label='Delete'
              width="45"
              height="53"
              viewBox="0 0 53 53">
              <TrashSVG
                transform={'scale(0.6) translate(35,-2)'}
                onClick={() => {
                  const updatedDirectories = projectDirectories.filter(item => item !== filepath);

                  onChange(updatedDirectories);
                }} />
            </SCTableCellSvg>
          </SCTableCellIcon>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Directory </h2>
      <div>
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

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
  SCTableHidden,
  SCCreateFormFieldSet
} from './styles';

const directoriesTableHeaders = [
  { label: 'Description' },
  { label: 'Path' },
  { label: 'Remove' }
];

const ConfigDirectory = ({ directories, onChange }) => {
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
          <SCTableCell isFirstCell><span>WIP</span></SCTableCell>
          <SCTableCell><span>{filepath}</span></SCTableCell>
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
        <form>
          <SCCreateFormFieldSet>
            <legend> Create New Directory </legend>
            <Text
              placeholder='Directory'
              selected={newDir}
              onChange={({ selected }) => {
                setNewDir(selected);
              }}
            />
            <Button
              classColor="primary"
              label="Submit"
              onClick={() => {
                const updatedDirectories = [newDir].concat(projectDirectories);

                onChange(updatedDirectories);
              }}
            />
          </SCCreateFormFieldSet>
        </form>
      </div>
    </div>
  );
};

export default ConfigDirectory;

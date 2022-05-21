import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/button';
import Text from 'components/form/Text';
import { TrashSVG } from 'components/icons/TrashSVG';
import { Table } from './ConfigTable';
import { SCTableCell, SCTableCellIcon, SCTableCellSvg, SCTableHidden, SCCreateFormFieldSet } from './styles';

const directoriesTableHeaders = [{ label: 'Description' }, { label: 'Path' }, { label: 'Delete' }];

const ConfigDirectory = ({ directories, onChange }) => {
  const dispatch = useDispatch();
  const [newDir, setNewDir] = useState({ label: '', value: '' });
  const [projectDirectories, setProjectDirectories] = useState([]);

  useEffect(() => {
    setProjectDirectories(directories);
  }, [directories]);

  const renderDirectoryCells = () => {
    return projectDirectories.map((dirItem) => {
      return (
        <tr key={dirItem.value}>
          <SCTableCell isFirstCell>
            <span>{dirItem.label}</span>
          </SCTableCell>
          <SCTableCell>
            <span>{dirItem.value}</span>
          </SCTableCell>
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label="Delete"
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                const updatedDirectories = projectDirectories.filter((item) => item.value !== dirItem.value);

                onChange(updatedDirectories);
              }}
            >
              <TrashSVG transform={'scale(0.6) translate(35,-2)'} />
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
        <Table headers={directoriesTableHeaders} body={renderDirectoryCells()} />
        <form>
          <SCCreateFormFieldSet>
            <legend> Create New Directory </legend>
            <Text
              placeholder="Description"
              selected={newDir.label}
              onChange={({ selected }) => {
                setNewDir({ label: selected, value: newDir.value, id: projectDirectories.length });
              }}
            />
            <Text
              placeholder="Path"
              selected={newDir.value}
              onChange={({ selected }) => {
                setNewDir({ label: newDir.label, value: selected, id: projectDirectories.length });
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

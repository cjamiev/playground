import React, { Fragment } from 'react';
import CheckboxRow from './CheckboxRow';

const SELECT_ALL_COLUMN_ID = 0;

const CheckboxGrid = ({ rows, header, onChangeCheckboxGrid }) => {
  const handleHeaderChange = ({ selectAll, values, columnId }) => {
    const updatedHeader = {
      ...header,
      selectAll,
      values
    };

    const selectedHeader = values.find(item => item.columnId === columnId);
    let updatedRows = [];
    if (columnId === SELECT_ALL_COLUMN_ID) {
      updatedRows = rows.map(entry => {
        const updatedValues = entry.values.map(item => {
          return {
            ...item,
            selected: selectAll
          };
        });

        return {
          ...entry,
          selectAll,
          values: updatedValues
        };
      });
    }
    else {
      updatedRows = rows.map(entry => {
        const updatedValues = entry.values.map(item => {
          if (item.columnId === selectedHeader.columnId) {
            return {
              ...item,
              selected: selectedHeader.selected
            };
          }

          return item;
        });

        return {
          ...entry,
          selectAll: selectedHeader.selected ? entry.selectAll : false,
          values: updatedValues
        };
      });
    }

    onChangeCheckboxGrid({ header: updatedHeader, rows: updatedRows });
  };

  const handleRowChange = ({ id, selectAll, values }) => {
    const updatedRows = rows.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          selectAll,
          values
        };
      }
      return entry;
    });

    const updatedHeaderValue = selectAll ? header.values : header.values.map(entity => {
      const isItemCheckedInSameColumn = values.find(item => item.selected && item.columnId === entity.columnId);

      return {
        ...entity,
        selected: entity.selected && isItemCheckedInSameColumn
      };
    });

    const updatedHeader = {
      ...header,
      selectAll: false,
      values: updatedHeaderValue
    };

    onChangeCheckboxGrid({ header: updatedHeader, rows: updatedRows });
  };

  const renderCheckboxRows = rows.map(entry => {
    return (
      <div key={entry.id}>
        <CheckboxRow
          id={entry.id}
          columnId={entry.columnId}
          label={entry.label}
          selectAllLabel={entry.selectAllLabel}
          selectAll={entry.selectAll}
          values={entry.values}
          onChangeRow={handleRowChange}
        />
      </div>
    );
  });

  return (
    <Fragment>
      <div>
        <CheckboxRow
          id={header.id}
          label={header.label}
          selectAllLabel={header.selectAllLabel}
          selectAll={header.selectAll}
          values={header.values}
          onChangeRow={handleHeaderChange}
        />
      </div>
      {renderCheckboxRows}
    </Fragment>
  );
};

export default CheckboxGrid;
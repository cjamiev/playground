import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import { TrashSVG } from 'components/atoms/Icons';
import {
  SCStandardTable,
  SCStandardTableHeaderCell,
  SCStandardTableCell,
  SCStandardTableHidden,
  SCStandardTableOverlayText,
  SCCellValue,
  SCCellLongValue
} from './styles';

const ZERO = 0;
const MAX_SIZE = 50;

const getLongValue = (item) => {
  const isLongValue = item.value.length > MAX_SIZE;
  const value = isLongValue ? `${item.value.slice(ZERO, MAX_SIZE)}...` : item.value;

  return { isLongValue, value };
};

const CellValue = ({ item, isHidden }) => {
  const { isLongValue, value } = getLongValue(item);

  if (isHidden) {
    return (
      <SCStandardTableCell>
        <SCStandardTableOverlayText>Click to see</SCStandardTableOverlayText>
        <SCStandardTableHidden>{item.value}</SCStandardTableHidden>
      </SCStandardTableCell>
    );
  } else {
    return (
      <SCStandardTableCell>
        <SCCellValue>{value}</SCCellValue>
        {isLongValue && <SCCellLongValue>{item.value}</SCCellLongValue>}
      </SCStandardTableCell>
    );
  }
};

const StandardTable = ({ labels, data, isHidden = false, onChange }) => {
  const renderHeaders = labels.tableHeaders.map((item) => {
    return <SCStandardTableHeaderCell key={item.label}>{item.label}</SCStandardTableHeaderCell>;
  });

  const renderCells = () => {
    return data.map((item) => {
      return (
        <tr key={item.value}>
          <SCStandardTableCell isFirstCell>
            <SCCellValue>{item.label}</SCCellValue>
          </SCStandardTableCell>
          <CellValue item={item} isHidden={isHidden} />
          <SCStandardTableCell isIcon>
            <TrashSVG
              transform="scale(0.6) translate(35,-2)"
              width="45"
              onClick={() => {
                const updatedData = data.filter((c) => c.value !== item.value);

                onChange(updatedData);
              }}
            />
          </SCStandardTableCell>
        </tr>
      );
    });
  };

  return (
    <SCStandardTable className="default-table">
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{renderCells()}</tbody>
    </SCStandardTable>
  );
};

export default StandardTable;

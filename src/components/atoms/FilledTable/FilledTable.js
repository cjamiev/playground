import React from 'react';
import {
  SCFilledTableWrapper,
  SCFilledTable,
  SCFilledTableHeader,
  SCFilledTableBody,
  SCFilledTableRow,
  SCFilledTableCell,
  SCFilledTableCellGlow
} from './styles';

const FilledTable = ({ tableHeaders, tableBody }) => {
  return (
    <SCFilledTableWrapper>
      <SCFilledTable>
        <SCFilledTableHeader>
          <tr>
            {tableHeaders.map((item) => {
              return <td key={item.label}>{item.label}</td>;
            })}
          </tr>
        </SCFilledTableHeader>
        <SCFilledTableBody>
          {tableBody.map((item) => {
            return (
              <SCFilledTableRow key={item.label}>
                <SCFilledTableCell>{item.label}</SCFilledTableCell>
                <SCFilledTableCellGlow>{item.value}</SCFilledTableCellGlow>
                <SCFilledTableCell>{item.value2}</SCFilledTableCell>
              </SCFilledTableRow>
            );
          })}
        </SCFilledTableBody>
      </SCFilledTable>
    </SCFilledTableWrapper>
  );
};

export default FilledTable;

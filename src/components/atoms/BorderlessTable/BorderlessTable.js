import React from 'react';
import { SCBorderlessTable, SCBorderlessTableFirstCell, SCBorderlessTableSecondCell } from './styles';

const ZERO = 0;
const ONE = 1;

const BorderlessTable = ({ tableHeaders, tableBody }) => {
  return (
    <SCBorderlessTable>
      <tbody>
        <tr>
          <SCBorderlessTableFirstCell>{tableHeaders[ZERO].label}</SCBorderlessTableFirstCell>
          <SCBorderlessTableSecondCell>{tableHeaders[ONE].label}</SCBorderlessTableSecondCell>
        </tr>
        {tableBody.map((item) => {
          return (
            <tr>
              <SCBorderlessTableFirstCell>{item.label}</SCBorderlessTableFirstCell>
              <SCBorderlessTableSecondCell>{item.value}</SCBorderlessTableSecondCell>
            </tr>
          );
        })}
      </tbody>
    </SCBorderlessTable>
  );
};

export default BorderlessTable;

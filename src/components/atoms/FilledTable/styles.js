import styled from 'styled-components';

export const SCFilledTableWrapper = styled.div`
  background-color: #1f232e;
  color: #fff;
  padding: 0 15px 15px;
  border-radius: 6px;
  width: 880px;
`;

export const SCFilledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const SCFilledTableHeader = styled.thead`
  font-weight: 700;
  padding: 10px;

  ::after,
  ::before {
    content: '';
    display: block;
    height: 10px;
    width: 100%;
  }
`;

export const SCFilledTableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid #292e3d;
  }
`;

export const SCFilledTableRow = styled.tr`
  :hover {
    background-color: hsl(216deg 25% 30%);
  }
`;

export const SCFilledTableCell = styled.td`
  padding: 10px;
`;

export const SCFilledTableCellGlow = styled.td`
  color: #a3cf06;
  padding: 10px;
`;

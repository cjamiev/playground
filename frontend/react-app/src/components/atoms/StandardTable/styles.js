import styled from 'styled-components';
import { Theme } from '../../../theme';

export const SCStandardTable = styled.table`
  width: 840px;
`;

export const SCStandardTableHeaderCell = styled.th`
  text-align: center;
  padding: 12px;
  text-align: left;
  background-color: rgb(40, 44, 52);
  color: white;
`;

export const SCStandardTableCell = styled.td`
  position: relative;
  color: hsl(0, 0%, 70%);
  background-color: ${Theme.primaryBackgroundColor};
  border: none;
  border-bottom: 1px solid hsl(0, 0%, 87%);
  height: 40px;
  width: ${(props) => (props.isIcon ? '40px' : '400px')};
  padding-top: 7px;

  svg {
    position: absolute;
    top: 3px;
  }

  svg:hover {
    transform: scale(1.1);
  }

  ${(props) => props.isClickable && 'cursor: pointer'};

  ${(props) =>
    props.isFirstCell &&
    `::before {
      position: absolute;
      content: '';
      top: 7px;
      height: 25px;
      width: 1px;
      background-color: hsl(0, 0%, 87%);
    }`};

  ::after {
    position: absolute;
    content: '';
    top: 7px;
    left: calc(100% - 2px);
    height: 25px;
    width: 1px;
    background-color: hsl(0, 0%, 87%);
  }
`;

export const SCStandardTableHidden = styled.span`
  display: none;

  ${SCStandardTableCell}:active & {
    display: inline;
  }
`;

export const SCStandardTableOverlayText = styled.span`
  display: inline;
  width: 100%;
  padding-left: 5px;
  cursor: pointer;

  ${SCStandardTableCell}:active & {
    display: none;
  }
`;

export const SCCellValue = styled.span`
  position: absolute;
  top: 7px;
  left: 5px;
  white-space: nowrap;
`;

export const SCCellLongValue = styled.span`
  display: none;
  position: absolute;
  top: 30px;
  right: -50px;
  height: 40px;
  padding: 10px;
  background-color: #ffffff;
  z-index: 1;

  ${SCStandardTableCell}:hover & {
    display: inline;
  }
`;

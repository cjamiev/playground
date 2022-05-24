import styled from 'styled-components';
import { Theme } from 'styles';

export const SCSettingsWrapper = styled.div`
  display: flex;
  column-gap: 20px;

  ${Theme.getMediaQuery(Theme.S, Theme.M)} {
    flex-direction: column;
  }
`;

export const SCTable = styled.table`
  width: 840px;
`;

export const SCTableHeaderCell = styled.th`
  text-align: center;
`;

export const SCTableCellIcon = styled.td`
  position: relative;
  background-color: ${Theme.primaryBgColor};
  border: none;
  border-bottom: 1px solid hsl(0, 0%, 87%);
  width: 40px;
  padding: 0;
  cursor: pointer;

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
    left: calc(100% - 1px);
    height: 25px;
    width: 1px;
    background-color: hsl(0, 0%, 87%);
  }
`;

export const SCTableCell = styled.td`
  position: relative;
  color: hsl(0, 0%, 70%);
  background-color: ${Theme.primaryBgColor};
  border: none;
  border-bottom: 1px solid hsl(0, 0%, 87%);
  height: 40px;
  width: 400px;
  padding: 0;

  span {
    position: absolute;
    top: 10px;
    left: 5px;
    white-space: nowrap;
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

export const SCTableCellSvg = styled.svg`
  position: absolute;
  top: 3px;

  :hover {
    transform: scale(1.1);
  }
`;

export const SCTableHidden = styled.span`
  display: none;

  ${SCTableCell}:active & {
    display: inline;
  }
`;

export const SCTableOverlayText = styled.span`
  display: inline;
  width: 100%;
  cursor: pointer;

  ${SCTableCell}:active & {
    display: none;
  }
`;

export const SCCreateFormFieldSet = styled.fieldset`
  width: 350px;
  padding: 10px;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;

  div {
    margin-bottom: 10px;
    margin-left: 6px;
  }

  button {
    margin-left: 25%;
  }
`;

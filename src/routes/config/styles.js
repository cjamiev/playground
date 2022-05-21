import styled from 'styled-components';
import { Theme } from 'styles';

export const SCConfigWrapper = styled.div`
  display: flex;
  column-gap: 20px;

  ${Theme.getMediaQuery(Theme.S, Theme.M)} {
    flex-direction: column;
  }
`;

export const SCTabButtonGroup = styled.div`
  display: flex;
  height: 50px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${Theme.primaryDarkColor};
`;

export const SCTabButton = styled.button`
  width: 120px;
  height: 30px;
  padding: 2px;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  background-color: ${Theme.primaryDarkColor};

  ${(props) =>
    props.isActive &&
    `
    color: hsl(240, 85%, 75%);
    background: ${Theme.secondaryDarkColor};
    box-shadow: 0px 2px 10px hsl(230, 85%, 75%);
    transform: translateY(1px);
  `};
`;

export const SCTable = styled.table`
  width: 840px;
`;

export const SCTableHeaderCell = styled.th`
  text-align: center;
`;

export const SCTableCellIcon = styled.td`
  position: relative;
  background-color: var(--primary-bg-color);
  border: none;
  border-bottom: 1px solid #dedede;
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
      background-color: #dedede;
    }`};

  ::after {
    position: absolute;
    content: '';
    top: 7px;
    left: calc(100% - 1px);
    height: 25px;
    width: 1px;
    background-color: #dedede;
  }
`;

export const SCTableCell = styled.td`
  position: relative;
  color: #b3b3b3;
  background-color: var(--primary-bg-color);
  border: none;
  border-bottom: 1px solid #dedede;
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
      background-color: #dedede;
    }`};

  ::after {
    position: absolute;
    content: '';
    top: 7px;
    left: calc(100% - 2px);
    height: 25px;
    width: 1px;
    background-color: #dedede;
  }
`;

export const SCTableCellSvg = styled.svg`
  position: absolute;
  top: 3px;
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

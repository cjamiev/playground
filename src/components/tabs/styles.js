import styled, { css } from 'styled-components';
import { Theme } from 'styles';

const lightPurple = 'hsl(252deg 67% 66%)';

const lightModeWrapper = css`
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid hsl(0, 0%, 47%);
`;

const darkModeWrapper = css`
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${Theme.secondaryBackgroundColor};
`;

export const SCTabButtonGroup = styled.div`
  ${(props) => {
    return props.isLightMode ? lightModeWrapper : darkModeWrapper;
  }};
`;

const lightModeButton = css`
  color: hsl(201, 100%, 53%);
  background-color: ${Theme.secondaryBackgroundColor};
  padding: 10px 20px 5px 20px;
  font-size: 1.5em;
  text-align: center;
  border: 0;
  cursor: pointer;
  z-index: 1;

  ${(props) =>
    props.isActive &&
    `
      position: relative;
      top: 2px;
      border-radius: 3px 3px 0 0;
      border-top: 1px solid hsl(0, 0%, 47%);
      border-left: 1px solid hsl(0, 0%, 47%);
      border-right: 1px solid hsl(0, 0%, 47%);
  `};
`;

const darkModeButton = css`
  width: 120px;
  height: 30px;
  padding: 2px;
  border-radius: 0;
  color: ${Theme.white};
  background-color: ${Theme.secondaryBackgroundColor};
  cursor: pointer;
  transition: color 500ms, box-shadow 500ms;

  ${(props) =>
    props.isActive &&
    `
      color: ${lightPurple};
      background-color: ${Theme.secondaryBackgroundColorHover};
      box-shadow: 0px 2px 10px ${Theme.primaryColor};
      transform: translateY(1px);
    `};
`;

export const SCTabButton = styled.button`
  ${(props) => {
    return props.isLightMode ? lightModeButton : darkModeButton;
  }};
`;

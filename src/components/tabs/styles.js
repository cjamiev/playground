import styled, { css } from 'styled-components';
import { Theme } from 'styles';

const lightModeWrapper = css`
  margin-top: 10px;
  border-bottom: 1px solid hsl(0, 0%, 47%);
`;

const darkModeWrapper = css`
  display: flex;
  height: 50px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${Theme.primaryDarkColor};
`;

export const SCTabButtonGroup = styled.div`
  ${(props) => {
    return props.isLightMode ? lightModeWrapper : darkModeWrapper;
  }};
`;

const lightModeButton = css`
  color: hsl(201, 100%, 53%);
  padding: 10px 20px 0px 20px;
  cursor: pointer;
  z-index: 1;
  font-size: 1.5em;
  text-align: center;
  border: 0;
  background-color: ${Theme.primaryDarkColor};

  ${(props) =>
    props.isActive &&
    `
      border-radius: 3px 3px 0 0;
      border-top: 1px solid hsl(0, 0%, 47%);
      border-left: 1px solid hsl(0, 0%, 47%);
      border-right: 1px solid hsl(0, 0%, 47%);
      border-bottom: 1px solid ${Theme.primaryDarkColor};
  `};
`;

const darkModeButton = css`
  width: 120px;
  height: 30px;
  padding: 2px;
  border-radius: 0;
  color: ${Theme.white};
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

export const SCTabButton = styled.button`
  ${(props) => {
    return props.isLightMode ? lightModeButton : darkModeButton;
  }};
`;

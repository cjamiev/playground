import styled from 'styled-components';
import { Theme } from 'theme';

export const SCNavigation = styled.nav`
  position: fixed;
  display: flex;
  top: 90%;
  left: 50%;
  transform: translateX(-50%);
  height: 70px;
  border-radius: 10px;
  z-index: 1;
  background-color: ${Theme.secondaryBackgroundColor};
  color: ${Theme.white};
`;

export const SCNavigationLinks = styled.div`
  width: 65px;
  height: 65px;
  cursor: pointer;
  position: relative;

  :hover {
    background-color: ${Theme.secondaryBackgroundColorHover};
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${Theme.secondaryBackgroundColorHover};
  `}

  ${({ isFirst }) =>
    isFirst &&
    `
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  `}

  ${({ isLast }) =>
    isLast &&
    `
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  `}
`;

export const SCNavigationIcon = styled.div`
  position: relative;
  top: 12px;
  left: 15px;

  ${({ isActive }) =>
    isActive &&
    `
    ::after {
      content: "";
      position: absolute;
      height: 3px;
      width: 45px;
      left: -5px;
      bottom: 15px;
      background-color: ${Theme.white};
    }
  `}
`;

export const SCNavigationLabels = styled.span`
  font-size: 24px;
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 8px;
  border-radius: 10px;
  position: relative;
  z-index: 1;
  bottom: 98px;
  left: ${(props) => (props.shift ? props.shift : '0px')};

  ${SCNavigationLinks}:hover & {
    visibility: visible;
  }
`;

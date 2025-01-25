import styled from 'styled-components';
import { Theme } from '../../../theme';

export const SCCollapsedList = styled.nav`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 65px;
  transition: width 500ms;
  z-index: 1;
  position: fixed;
  overflow: hidden;
  background-color: ${Theme.secondaryBackgroundColor};
  color: ${Theme.white};

  :hover {
    width: 250px;
  }
`;

export const SCCollapsedListLinks = styled.div`
  position: relative;
  height: 50px;
  cursor: pointer;

  :hover {
    background-color: ${Theme.secondaryBackgroundColorHover};
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${Theme.secondaryBackgroundColorHover};
  `}
`;

export const SCCollapsedListShortLabel = styled.div`
  margin: 5px 10px;
  position: absolute;
  top: 10px;
  left: 5px;

  ${({ isActive }) =>
    isActive &&
    `
    ::before {
      content: "";
      position: absolute;
      height: 45px;
      width: 3px;
      left: -10px;
      bottom: -10px;
      background-color: ${Theme.white};
    }
  `}
`;

export const SCCollapsedListLabel = styled.span`
  position: relative;
  top: 10px;
  left: 70px;
  font-size: 24px;
  white-space: nowrap;
`;

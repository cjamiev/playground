import styled from 'styled-components';
import { Theme } from '../../../theme';

export const SCMultiDropdown = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 400px;
  background-color: ${Theme.secondaryBackgroundColor};
  border-radius: 10px 10px 0 0;
`;

export const SCMultiDropdownBtnGroup = styled.div`
  display: flex;
  border-bottom: 1px solid ${Theme.secondaryBackgroundColor};
`;

export const SCMultiDropdownBtn = styled.button`
  border: none;
  color: ${Theme.white};
  min-height: 50px;
  cursor: pointer;
  background-color: ${Theme.secondaryBackgroundColor};
  flex: 1;
  ${(props) => props.isActive && `background-color: ${Theme.secondaryBackgroundColorHover};`};

  :hover {
    background-color: ${Theme.secondaryBackgroundColorHover};
    outline: none;
  }
`;

export const SCMultiDropdownList = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  top: 50px;
  height: ${(props) => (props.isVisible ? '500px' : '0px')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  padding-top: ${(props) => (props.isVisible ? '10px' : '0px')};
  background-color: ${Theme.secondaryBackgroundColor};
  transition: height 500ms;
  z-index: 2;
`;

export const SCMultiDropdownListBtn = styled.button`
  border: none;
  color: ${Theme.white};
  background-color: ${Theme.secondaryBackgroundColor};
  cursor: pointer;

  :hover {
    background-color: ${Theme.secondaryBackgroundColorHover};
    outline: none;
  }

  :active {
    background-color: ${Theme.secondaryBackgroundColorHover};
  }
`;

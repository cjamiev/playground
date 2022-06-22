import styled from 'styled-components';
import { Theme } from 'theme';

export const SCMultiDropdown = styled.div`
  z-index: 2;
  width: 400px;
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
  height: ${(props) => (props.isVisible ? '500px' : '0px')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  margin-top: ${(props) => (props.isVisible ? '10px' : '0px')};
  background-color: ${Theme.secondaryBackgroundColor};
  transition: height 500ms;
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

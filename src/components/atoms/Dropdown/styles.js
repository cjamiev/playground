import styled from 'styled-components';
import { Theme } from 'theme';

export const SCDropdown = styled.div`
  width: 400px;
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10px 10px 0 0;
`;

export const SCDropdownBtn = styled.button`
  cursor: pointer;
`;

export const SCDropdownContent = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  height: ${(props) => (props.isVisible ? '500px' : '0px')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  margin-top: ${(props) => (props.isVisible ? '10px' : '0px')};
  z-index: 2;

  background-color: #fff;
  padding: 10px;
  border: 1px solid black;
  width: 400px;
  height: 400px;
  top: 30px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const SCDropdownHeader = styled.div`
  height: 133px;
  width: 100%;
  border-bottom: 1px solid #999;
`;

export const SCDropdownBody = styled.div`
  height: 133px;
  width: 100%;
  border-bottom: 1px solid #999;
`;

export const SCDropdownFooter = styled.div`
  height: 133px;
  width: 100%;
`;

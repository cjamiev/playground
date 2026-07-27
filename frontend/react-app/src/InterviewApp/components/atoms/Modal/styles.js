import styled from 'styled-components';
import { Theme } from '../../../theme';

export const SCModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: hsl(0,0%,100%,70%);
  top: 0;
  left: 0;
`;

export const SCModal = styled.div`
  z-index: 3;
  position: absolute;
  display: flex;
  flex-direction: column;
  height: clamp(20%, 60%, 600px);
  width: clamp(20%, 40%, 500px);
  top: 20%;
  left: 35%;
  pointer-events: auto;
  background-color: ${(props) => props.$islightmode ? Theme.colors['lightPrimaryColor'] : Theme.colors['darkPrimaryColor']};
  > div {
    color: ${(props) => props.$islightmode ? 'black' : 'white'};
  }
  border: 1px solid hsl(0, 0%, 0%);
  border-radius: 5px;
  opacity: 1;
`;

export const SCModalHeader = styled.div`
  flex: 2 1 100px;
  padding-left: 10px;
  border-bottom: 1px dashed ${(props) => props.$islightmode ? Theme.colors['darkPrimaryColor'] : Theme.colors['lightPrimaryColor']};
  position: relative;
`;

export const SCCloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 10px;
  border: none;
  z-index: 4;
  transition: transform 500ms;
  background-color: transparent;
  color: ${(props) => props.$islightmode ? 'black' : 'white'};

  &:hover {
    transform: scale(1.2);
  }
`;

export const SCModalTitle = styled.h2`
  position: relative;
  font-size: 36px;
  top: 15px;
`;

export const SCModalBody = styled.div`
  flex: 6 2 500px;
  padding-top: 10px;
  padding-left: 10px;
  overflow-y: auto;
  color: black;
`;

export const SCModalFooter = styled.div`
  flex: 2 1 100px;
  border-top: 1px dashed ${(props) => props.$islightmode ? Theme.colors['darkPrimaryColor'] : Theme.colors['lightPrimaryColor']};
  height: 100%;
  padding-left: 10px;
  display: flex;
  place-content: center;
  column-gap: 10px;

  button {
    margin-top: 10px;
    height: 50px;
    min-width: 100px;
  }
`;
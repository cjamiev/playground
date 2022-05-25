import styled from 'styled-components';
import { Theme } from 'styles';

export const SCModal = styled.div`
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 500px;
  margin: 200px auto;
  pointer-events: auto;
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(0, 0%, 0%);
  border-radius: 5px;
  opacity: 1;

  svg {
    position: absolute;
    top: 1%;
    left: 94%;
    cursor: pointer;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

export const SCModalHeader = styled.div`
  flex: 1;
  padding: 1em;
  border-bottom: 1px solid hsl(0, 0%, 0%);
  background-color: ${Theme.primaryDarkColor};
  color: #fff;
`;

export const SCModalTitle = styled.h2`
  font-size: 36px;
`;

export const SCModalBody = styled.div`
  flex: 6;
  padding: 1em;
  overflow-y: auto;
`;

export const SCModalFooter = styled.div`
  flex: 1;
  border-top: 1px solid hsl(0, 0%, 0%);
  height: 100%;
  background-color: ${Theme.primaryDarkColor};
  padding-left: 10px;
  display: flex;
`;

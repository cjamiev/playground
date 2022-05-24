import styled from 'styled-components';

export const SCModal = styled.div`
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  height: 40em;
  width: 80em;
  pointer-events: auto;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 2.1em;
  opacity: 1;
`;

export const SCModalHeader = styled.div`
  flex: 1;
  padding: 1em;
  border-bottom: 1px solid #000;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 2em 2em 0 0;
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
  border-top: 1px solid #000;
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 0 0 2em 2em;
  text-align: right;
  padding-right: 20px;
`;

import styled from 'styled-components';

export const SCDropdown = styled.div`
  width: 400px;
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10px 10px 0 0;
`;

export const SCDropdownBtn = styled.button`
  cursor: pointer;
  background-color: ${(props) => (props.$islightmode ? '#fff' : '#000')};
  color: ${(props) => (props.$islightmode ? '#000' : '#fff')};
`;

export const SCDropdownContent = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  height: ${(props) => (props.$isvisible ? '500px' : '0px')};
  visibility: ${(props) => (props.$isvisible ? 'visible' : 'hidden')};
  margin-top: ${(props) => (props.$isvisible ? '10px' : '0px')};
  z-index: 2;

  width: 400px;
  height: 400px;
  top: 25px;

  > div > button {
    background-color: ${(props) => (props.$islightmode ? '#fff' : '#000')};
    color: ${(props) => (props.$islightmode ? '#000' : '#fff')};
    border: 1px solid ${(props) => (props.$islightmode ? '#eee' : '#111')};;

    &:hover {
      border: 1px solid ${(props) => (props.$islightmode ? '#000' : '#fff')};
    }
  }
`;

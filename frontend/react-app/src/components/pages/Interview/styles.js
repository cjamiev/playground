import styled from 'styled-components';

export const SCButtonList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SCDropdownWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: auto;
  width: fit-content;
`;

export const SCDisplayCode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SCContentWrapper = styled.div`
  display: flex;
  margin: auto;
  width: fit-content;
  padding: 10px;
`;

export const SCSectionWrapper = styled.div`
  margin-right: 20px;
  max-height: 700px;
  padding: 5px;

  > div {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px dashed ${(props) => props.$islightmode ? 'black' : 'white'};
    width: 500px;
  }
`;

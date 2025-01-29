import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const SCLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${(props) => props.$isLightMode ? 
`
  background-color: white;
  color: black;
`:
`
  background-color: #282A35;
  color: white;
`
}
`;

export const SCPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  min-height: 830px;
  animation: ${fadeIn} 500ms ease 0s 1 normal forwards;
`;

export const SCPage = styled.div`
  padding-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
  }
  `;
  
  export const SCPageHeader = styled.div`
  position: relative;
  height: 100px;
  width: 100%;
  white-space: nowrap;
  text-align: center;
  `;
  
  export const SCPageHeaderTitle = styled.h1`
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
`;

export const SCSidepanelBtn = styled.div`
  display: inline-block;
  margin-left: 10px;

  svg {
    cursor: pointer;
  }
`;

import styled  from 'styled-components';

export const SCSidepanel = styled.div`
  position: relative;
  border-right: 1px solid rgb(228, 228, 228);
  height: 100vh;
  width: 650px
`;

export const SCSidepanelHeader = styled.div`
  position: relative;
  height: 100px;
  white-space: nowrap;
`;

export const SCSidepanelTitle = styled.h2`
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

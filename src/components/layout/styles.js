import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    width: 0;
    opacity: 0;
    transform: translateX(-600px);
  }
`;

const slideIn = keyframes`
  0% {
    width: 0;
    opacity: 0;
    transform: translateX(-600px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const SCLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  min-height: 830px;
  animation: ${fadeIn} 500ms ease 0s 1 normal forwards;
`;

export const SCPageWrapper = styled.div`
  padding-left: 10px;
  width: ${props => (props.isSideBarFullSize ? '0px' : '100%')};
`;

export const SCPageHeader = styled.div`
  position: relative;
  height: 100px;
  white-space: nowrap;
`;

export const SCPageHeaderTitle = styled.h1`
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
`;

export const SCSidepanel = styled.div`
  border-right: 1px solid rgb(228, 228, 228);
  animation: ${props => (props.isTransitioningOut
    ? css`${slideOut} 500ms ease-out 0s 1 normal forwards;`
    : css`${slideIn} 500ms ease-out 0s 1 normal forwards;`)}

  ${props => (props.isFullSize ? 'width: 100%' : 'width: 650px')}
`;

export const SCSidepanelHeader = styled.div`
  ${props => (props.isFullSize
    ? 'height: 60px;'
    : `
      position: relative;
      height: 100px;
      white-space: nowrap;
    `)}
`;

export const SCSidepanelTitle = styled.h2`
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
`;

export const SCSidepanelBtn = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

export const SCFooter = styled.footer`
  position: fixed;
  height: 50px;
  top: calc(100% - 50px);
  left: calc(100% - 100px);
`;

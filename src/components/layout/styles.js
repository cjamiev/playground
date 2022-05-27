import styled, { css, keyframes } from 'styled-components';
import { Theme } from 'styles';

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
  width: ${(props) => (props.isSideBarFullSize ? '0px' : '100%')};
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
  position: relative;
  border-right: 1px solid rgb(228, 228, 228);
  animation: ${({ isTransitioningOut }) => {
    return isTransitioningOut
      ? css`
          ${slideOut} 500ms ease-out 0s 1 normal forwards;
        `
      : css`
          ${slideIn} 500ms ease-out 0s 1 normal forwards;
        `;
  }};
  ${(props) => {
    return props.isFullSize
      ? `
      position: absolute;
      background-color: ${Theme.white};
      z-index: 2;
      width: 100%;
      height: 100%;
    `
      : 'width: 650px';
  }};
`;

export const SCSidepanelHeader = styled.div`
  ${({ isFullSize }) => {
    return isFullSize
      ? 'height: 60px;'
      : `
      position: relative;
      height: 100px;
      white-space: nowrap;
    `;
  }}
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

export const SCQuickAccess = styled.footer`
  position: fixed;
  z-index: 2;
  width: 400px;
  bottom: -20px;
  left: calc(100% - 400px);
  display: flex;
  flex-direction: column;
  background-color: ${Theme.lightBlack};
  border-radius: 10px 10px 0 0;
`;

export const SCQuickAccessBtnGroup = styled.div`
  display: flex;
  border-bottom: 1px solid ${Theme.lightBlack};
`;

export const SCQuickAccessBtn = styled.button`
  border: none;
  color: ${Theme.white};
  min-height: 50px;
  cursor: pointer;
  background-color: ${Theme.lightBlack};
  flex: 1;
  ${(props) => props.isActive && `background-color: ${Theme.darkBlack};`};

  :hover {
    background-color: ${Theme.darkBlack};
    outline: none;
  }
`;

export const SCQuickAccessList = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.isVisible ? '500px' : '0px')};
  background-color: ${Theme.lightBlack};
  margin-top: 20px;
  transition: height 500ms;
`;

export const SCQuickAccessListBtn = styled.button`
  border: none;
  color: ${Theme.white};
  min-height: 50px;
  background-color: ${Theme.lightBlack};
  cursor: pointer;

  :hover {
    background-color: ${Theme.darkBlack};
    outline: none;
  }

  :active {
    background-color: ${Theme.darkBlack};
  }
`;

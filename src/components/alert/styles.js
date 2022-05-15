import styled, { css } from 'styled-components';

const bgColorInfo = '#b8daff';
const bgColorSuccess = '#c3e6cb';
const bgColorWarning = '#ffeeba';
const bgColorError = '#f5c6cb';

const statusInfo = css`
  color: #004085;
  background-color: #cce5ff;
  border: 1px solid ${bgColorInfo};
`;

const statusSuccess = css`
  color: #155724;
  background-color: #d4edda;
  border: 1px solid ${bgColorSuccess};
`;

const statusWarning = css`
  color: #856404;
  background-color: #fff3cd;
  border: 1px solid ${bgColorWarning};
`;

const statusError = css`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid ${bgColorError};
`;

export const SCAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: calc(100% - 325px);
  top: 0px;
  min-height: 150px;
  width: 300px;
  z-index: 2;
`;

export const SCAlert = styled.div`
  margin-top: 20px;
`;

export const SCAlertHeader = styled.h2`
  position: relative;
  font-size: 20px;
  text-transform: capitalize;
  padding: 5px 10px;

  ${props => {
    if(props.status === 'success') {
      return statusSuccess;
    }
    if(props.status === 'error') {
      return statusError;
    }
    if(props.status === 'info') {
      return statusInfo;
    }
    else {
      return statusWarning;
    }
  }}

  button {
    position: absolute;
    left: calc(100% - 30px);
    top: 1px;
    height: 10px;
    border: none;
    color: inherit;
    background-color: inherit;
    cursor: pointer;
  }
`;

const getBorderColor = css`
  ${props => {
    if(props.status === 'success') {
      return bgColorSuccess;
    }
    if(props.status === 'error') {
      return bgColorError;
    }
    if(props.status === 'info') {
      return bgColorInfo;
    }
    else {
      return bgColorWarning;
    }
  }}
`;

export const SCAlertContent = styled.div`
  border-left: 1px solid ${getBorderColor};
  border-right: 1px solid ${getBorderColor};
  border-bottom: 1px solid ${getBorderColor};
  padding: 5px 10px;
  background-color: #fff;
  
  span {
    font-size: 16px;
    white-space: normal;
  }
`;
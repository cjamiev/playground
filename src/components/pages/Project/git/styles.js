import styled from 'styled-components';
import { Theme } from 'styles';

export const SCGitPageWrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;

export const SCNameTxt = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SCBranchesWrapper = styled.div`
  display: flex;
`;

export const SCBranchBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  row-gap: 5px;
`;

export const SCGitBtnWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;

  button {
    margin-right: 10px;
    width: 180px;
  }
`;

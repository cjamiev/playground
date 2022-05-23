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

export const SCBranchBtn = styled.button`
  min-width: 200px;
  height: 60px;
  margin-bottom: 0px;
  border-radius: 0;
  background-color: hsl(204, 89%, 18%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  :hover {
    background-color: hsl(204, 100%, 35%);
  }
`;

export const SCFlexWrapper = styled.div`
  display: flex;
`;

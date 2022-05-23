import styled from 'styled-components';
import Button from 'components/button';

export const SCDirBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 130px;
  row-gap: 5px;

  h3 {
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const SCDirectoryBtn = styled(Button)`
  width: 200px;
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

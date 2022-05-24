import styled from 'styled-components';
import { Theme } from 'styles';
import Button from 'components/button';

export const SCFileBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  row-gap: 5px;
`;

export const SCFileNameWrapper = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;

  svg {
    position: relative;
    bottom: 5px;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

export const SCFileBtn = styled(Button)`
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

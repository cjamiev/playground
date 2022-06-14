import styled from 'styled-components';
import { Theme } from 'styles';
import Button from 'components/button';

export const SCFlexWrapper = styled.div`
  display: flex;
  ${(props) => props.isVertical && 'flex-direction: column'};
`;

export const SCTitleWrapper = styled.div`
  display: flex;
  svg {
    cursor: pointer;
  }
`;

export const SCFileBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  row-gap: 10px;

  button {
    width: 250px;
  }
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

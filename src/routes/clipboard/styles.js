import styled from 'styled-components';
import { Theme } from 'styles';

export const SCFlexWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  column-gap: 30px;
`;

export const SCClipboardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 0 auto;

  ${Theme.getMediaQuery(Theme.L)} {
    display: grid;
    grid-template-columns: auto auto;
  }

  ${Theme.getMediaQuery(Theme.M, Theme.S)} {
    display: flex;
    flex-direction: column;
  }
`;

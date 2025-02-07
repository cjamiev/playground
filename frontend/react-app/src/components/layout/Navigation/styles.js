import styled from 'styled-components';
import { Theme } from '../../../theme';

export const SCNavigation = styled.nav`
  padding: 10px;
  width: 100%;
  height: 100%;
  border-bottom: 1px dashed #9f9fa8;
  position: relative;
  display: flex;
`;

export const SCNavigationLink = styled.div`
  list-style-type: none;
  padding: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
  cursor: pointer;
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid #444444;
    transform: scale(1.05);
  }
`;

export const SCNavigationThemeMode = styled.button`
  width: 100px;
  position: absolute;
  top: 15px;
  right: 30px;
  font-size: 12px;
  background-color: ${(props) => props.$islightmode ? Theme.colors['lightPrimaryColor'] : Theme.colors['darkSecondaryColor']};
  color: ${(props) => (props.$islightmode ? '#000' : '#fff')};
`;

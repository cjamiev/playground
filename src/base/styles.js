import styled from 'styled-components';
import { colors } from 'styles';

export const SCMainLayout = styled.div`
  display: flex;
`;

export const SCNavigation = styled.nav`
background-color: ${colors.primaryDarkColor};
color: ${colors.white};
display: flex;
flex-direction: column;
width: 50px;
min-height: 937px;
transition: width 500ms;

:hover {
  width: 250px;
}
`;

export const SCNavigationContent = styled.nav`
  width: inherit;
  position: fixed;
  height: 100%;
  overflow: hidden;
`;

export const SCNavigationLinks = styled.div`
  position: relative;
  left: 50px;
  font-size: 24px;
  white-space: nowrap;
  cursor: pointer;
`;
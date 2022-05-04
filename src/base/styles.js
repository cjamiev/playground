import styled from 'styled-components';
import { colors } from 'styles';

export const SCNavigation = styled.nav`
  background-color: ${colors.primaryDarkColor};
  color: ${colors.white};
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  width: 60px;
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
  height: 50px;
  cursor: pointer;

  :hover {
    background-color: ${colors.secondaryDarkColor};
  }

  ${({ isActive }) => isActive && `
    background-color: ${colors.secondaryDarkColor};
  `}
`;

export const SCNavigationIcon = styled.div`
  margin: 5px 10px;
  position: absolute;

  ${({ isActive }) => isActive && `
    ::before {
      content: "";
      position: absolute;
      height: 45px;
      width: 3px;
      left: -5px;
      bottom: 15px;
      background-color: ${colors.white};
    }
  `}
`;

export const SCNavigationLabels = styled.span`
  position: relative;
  top: 10px;
  left: 70px;
  font-size: 24px;
  white-space: nowrap;
`;
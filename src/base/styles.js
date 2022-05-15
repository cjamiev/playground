import styled from 'styled-components';
import { colors } from 'styles';

export const SCMainLayout = styled.div`
  display: flex;
  width: 100%;
`;

export const SCNavigation = styled.nav`
  background-color: ${colors.primaryDarkColor};
  color: ${colors.white};
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 65px;
  min-height: 937px;
  transition: width 500ms;
  z-index: 1;

  :hover {
    width: 250px;
  }
`;

export const SCWeek = styled.span`
  position: relative;
  left: 20px;
  bottom: 3px;
  font-size: 24px;
  font-weight: bold;

  ::after {
    content: '';
    height: 30px;
    width: 30px;
    border: 2px solid white;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    right: 28px;
    top: 8px;
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
  top: ${({ isAtBottom }) => (isAtBottom ? '495px' : '10px')};

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
  left: 5px;

  ${({ isActive }) => isActive && `
    ::before {
      content: "";
      position: absolute;
      height: 45px;
      width: 3px;
      left: -10px;
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
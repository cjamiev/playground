import styled from 'styled-components';
import { Theme } from 'styles';

export const SCButton = styled.button`
  min-height: 50px;
  cursor: pointer;

  :active {
    transform: translatey(2px);
  }

  ${(props) => {
    return props.isPrimary
      ? `
        background-color: ${Theme.primaryColor};
        border: 1px solid ${Theme.primaryColorHover};
        color: #fff;

      :hover {
        background-color: ${Theme.primaryColorHover};
        box-shadow: 2px 2px 0px ${Theme.primaryColor};
      }`
      : `
      background-color: ${Theme.secondaryColor};
        border: 1px solid ${Theme.secondaryColorHover};
        color: #fff;

        :hover {
          background-color: ${Theme.secondaryColorHover};
          box-shadow: 2px 2px 0px ${Theme.secondaryColor};
        }
      `;
  }};
`;

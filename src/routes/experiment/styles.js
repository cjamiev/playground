import styled from 'styled-components';

export const SCDiv = styled.div`
  font-size: 2em;
  color: ${(props) => (props.isRed ? 'red' : 'blue')};

  :hover {
    color: green;
  }
`;

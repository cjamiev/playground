import styled from 'styled-components';

const lightBlack = '#24292e';
const lightGrey = '#40454F';
const greenBlue = '#25515E';
const darkBlue = '#34405D';
const vlightPurple = '#F2ECFF';
const lightPurple = '#8A7E93';
const darkPurple = '#5E4B5B';

export const SCDiv = styled.div`
  font-size: 2em;
  color: ${(props) => (props.isRed ? 'red' : 'blue')};

  :hover {
    color: green;
  }
`;

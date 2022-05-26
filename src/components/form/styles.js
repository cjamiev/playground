import styled from 'styled-components';

export const SCCreateFormFieldSet = styled.fieldset`
  position: relative;
  width: 300px;
  padding: 10px;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;

  svg {
    position: relative;
    top: 6px;
    left: 3px;
    margin-right: 5px;
    cursor: pointer;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

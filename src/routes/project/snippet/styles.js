import styled from 'styled-components';

export const SCFlexWrapper = styled.div`
  display: flex;
`;

export const SCCreateFormFieldSet = styled.fieldset`
  width: 350px;
  padding: 10px;
  border-width: 2px;
  border-style: groove;
  border-color: threedface;
  border-image: initial;

  div {
    margin-bottom: 10px;
    margin-left: 6px;
  }

  button {
    margin-left: 25%;
  }
`;

export const SCLoadHeader = styled.div`
  display: flex;
  margin-bottom: 10px;

  h2 {
    margin-top: 10px;
  }
`;

export const SCButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-left: -10px;
`;

export const SCSnippetTextWrapper = styled.div`
  width: 100%;
  margin: 10px;
`;

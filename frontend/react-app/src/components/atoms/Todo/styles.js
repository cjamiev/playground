import styled from 'styled-components';

export const SCTodoInput = styled.input`
  margin-right: 20px;
  border: none;
  border-bottom: 2px dashed gray;
  font-size: 24px;
  ${(props) => props.$isLightMode ?
    `
    `:
    `
      background-color: #282A35;
      color: white;
      ::placeholder {
        color: white;
        opacity: 0.9; /* Firefox */
      }
    `
  }
  
  :focus {
    outline: none;
    border-bottom: 2px solid gray;
  }
`;

export const SCTodoWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  max-width: 1000px;
`;
export const SCTodoName = styled.span`
  font-size: 20px;
  padding: 3px;
  margin-right: 5px;
  flex: 2 1 100px;
`;

export const SCTodoDesc = styled.span`
  font-size: 20px;
  padding: 3px;
  margin-right: 5px;
  flex: 2 1 100px;
`;

export const SCTodoBtn = styled.button`
  font-size: 20px;  
  flex: 3 2 100px;
  margin-right: 5px;
  border-radius: 0;
  box-shadow: none;
  border: 1px dashed gray;
  ${(props) => props.disabled ? 
    `
      color: #eee;
      cursor: default;
    ` : ''}

`;

export const SCTodoSubmit = styled.button`
  font-size: 20px;  
  border-radius: 5px;
  box-shadow: none;
  padding: 10px;
  border: 1px solid #777;
`;
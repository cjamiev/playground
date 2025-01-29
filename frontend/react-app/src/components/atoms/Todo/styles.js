import styled from 'styled-components';

export const SCSectionWrapper = styled.div`
  margin: auto;
  width: 80%;
  padding: 10px;

  > h2 {
    margin: auto;
    width: fit-content;
    padding: 10px;
  }
`;

export const SCTodoForm = styled.div`
  margin: auto;
  width: fit-content;
  padding: 10px;
`;

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

export const SCTodoBtn = styled.button`
  font-size: 20px;  
  border-radius: 5px;
  box-shadow: none;
  padding: 10px;
  border: 1px solid #777;
`;

export const SCSortAndFilterWrapper = styled.div`
  margin: 10px 0;
  min-width: 1000px;
`;

export const SCFilterLabel = styled.label `
  font-size: 20px;
  margin-right: 5px;
`;

export const SCSearchFilter = styled.input`
  font-size: 20px;
  padding: 10px;
  border-radius: 5px;
  margin-right: 5px;
`;

export const SCSortLabel = styled.label `
  font-size: 20px;
  margin-right: 5px;
  margin-left: 5px;
  padding-bottom: 3px;
  cursor: pointer;
`;

export const SCSortBtn = styled.input`
  font-size: 20px;  
  border-radius: 5px;
  box-shadow: none;
  padding: 10px;
  border: 1px solid #777;
`;

export const SCErrorMsg = styled.div`
    color: red;
`;

export const SCTodoListContainer = styled.div`
  margin: auto;
  width: fit-content;
  padding: 10px;
`;

export const SCTodoHeader = styled.div`
  display: flex;
  font-size: 20px;
  gap: 5px;
  min-width: 1000px;
  max-width: 1800px;
  overflow-x: auto;
`;

export const SCTodoTextHeader = styled.span`
  flex: 2 1 200px;
  text-decoration: underline;
`;

export const SCTodoBtnHeader = styled.span`
  flex: 3 1 200px;
  text-decoration: underline;
`;

export const SCTodoWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  min-width: 1000px;
  max-width: 1800px;
  overflow-x: auto;
`;

export const SCTodoName = styled.span`
  font-size: 20px;
  padding: 3px;
  margin-right: 5px;
  flex: 2 1 200px;
`;

export const SCTodoDesc = styled.span`
  font-size: 20px;
  padding: 3px;
  margin-right: 5px;
  flex: 2 1 200px;
`;

export const SCTodoListBtn = styled.button`
  font-size: 20px;  
  flex: 3 1 200px;
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

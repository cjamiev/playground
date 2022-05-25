import styled from 'styled-components';

export const SCHomeCardWrapper = styled.div`
  > div {
    height: ${(props) => (props.isLarge ? '350px' : '250px')};
    width: ${(props) => (props.isLarge ? '500px' : '200px')};
  }

  > div > div:first-child {
    font-size: 20px;
  }

  > div > div:nth-child(2) {
    text-align: left;
  }

  > div > div:last-child {
    margin-bottom: 10px;
  }
`;

export const SCHomeFooter = styled.div`
  svg {
    cursor: pointer;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

export const SCTodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 200px;
  padding-top: 10px;
  padding-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  box-shadow: 0px 4px 4px 1px hsl(0, 0%, 80%);
`;

export const SCTodoTitleWrapper = styled.div`
  display: flex;
  position: relative;

  h2 {
    font-size: 24px;
    text-decoration: underline;
    min-width: 18ch;
  }

  svg {
    position: relative;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  svg:hover {
    transform: scale(1.1);
  }
`;

export const SCTodoList = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    font-size: 20px;
  }
`;

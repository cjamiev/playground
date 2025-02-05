import styled from 'styled-components';

export const SCCodeWrapper = styled.code`
  width: 600px;
  height: fit-content;
  padding: 20px;
  border: 2px solid ${(props) => props.$islightmode ? '#eee' : '#1b181b'};
  border-radius: 8px;
  background-color: ${(props) => props.$islightmode ? '#fcfcfa' : '#221f22'};
  font-family: mono-space;
  position: relative;
  counter-reset: section;

  .mk-comments { color: #727072; } 
  .mk-white { color: ${(props) => props.$islightmode ? '#221f22' : '#fcfcfa'}; } 
  .mk-yellow { color: #ffd866; } 
  .mk-green { color: #a9dc76; } 
  .mk-orange { color: #fc9867 } 
  .mk-purple { color: #ab9df2; } 
  .mk-red { color: #ff6188; } 
  .mk-blue { color: #78dce8; }  
  .mk-dkblue { color: #3a6bf3; }  

  .line {
    margin-bottom: 3px;
  }

  .line::before {
    counter-increment: section;
    content: counter(section);
    color: ${(props) => props.$islightmode ? '#bbb' : '#5b595c'};
    margin-right: 3ch;
    width: 3ch;
    text-align: right;
    display: inline-block;
  }

  .indent-1 { margin-left: 2ch; }
  .indent-2 { margin-left: 4ch; }
  .indent-3 { margin-left: 6ch; }
  .indent-4 { margin-left: 8ch; }
  .indent-5 { margin-left: 10ch; }
  .indent-6 { margin-left: 12ch; }
  .indent-7 { margin-left: 14ch; }

  .copy-btn {
    position: absolute;
    top: 3px;
    right: 0;
    border-radius: 10px;
    background-color: ${(props) => props.$islightmode ? '#fcfcfa' : '#221f22'}; 
    color: ${(props) => props.$islightmode ? '#221f22' : '#fcfcfa'};
    visibility: hidden;
  }
  
  &:hover .copy-btn {
    visibility: visible;
  }
`;

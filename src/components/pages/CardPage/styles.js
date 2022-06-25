import styled from 'styled-components';

export const SCFlexWrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;

export const SCCard = styled.div`
  cursor: pointer;
  height: 200px;
  width: 250px;
  padding: 5px 0px 0px 5px;
  transition: box-shadow 500ms ease-out 0ms, transform 500ms ease 0s, height 500ms ease 0s;
  background-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0px 4px 4px 1px ${(props) => props.lightColor};
  border-radius: 20px 20px 20px 20px;
  border: 1px none #ffffff;

  :hover {
    transform: scaleX(1.04) scaleY(1.06);
    box-shadow: 0px 4px 15px 8px ${(props) => props.intenseColor};
    border: 1px none #000000;
    height: 400px;
  }
`;

export const SCCardTop = styled.div`
  position: relative;
  width: 100%;
  height: 85%;
  z-index: 1;

  ${SCCard}:hover & {
    height: 40%;
  }
`;

export const SCCardMiddle = styled.div`
  position: relative;
  width: 0%;
  height: 0%;
  visibility: hidden;

  ${SCCard}:hover & {
    visibility: visible;
    height: 50%;
    width: 100%;
  }
`;

export const SCCardBottom = styled.div`
  position: relative;
  width: 100%;
  height: 15%;
`;

export const SCCardImage = styled.img`
  position: absolute;
  transform: ${(props) => props.transform};
  filter: grayscale(0.4);

  ${SCCard}:hover & {
    filter: grayscale(0);
  }

  :before {
    content: 'Loading';
    display: block;
    position: absolute;
    height: 50px;
    width: 50px;
  }
`;

export const SCCardTitle = styled.div`
  color: #000000;
  font-size: 20px;
  text-align: center;
`;

import React, { useState } from 'react';
import Page from 'components/layout/Page';
import { SCFlexWrapper, SCCard, SCCardTop, SCCardMiddle, SCCardBottom, SCCardImage, SCCardTitle } from './styles';

const CardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Page>
      <SCFlexWrapper>
        <SCCard lightColor="hsl(282deg 22% 40%)" intenseColor="hsl(282deg 22% 60%)">
          <SCCardTop>
            {isLoading && <div> Loading </div>}
            <SCCardImage
              src="ginyu.jpg"
              alt="Ginyu Transformation"
              transform="scale(0.06) translate(-19700px, -19000px)"
              onLoad={() => {
                setIsLoading(false);
              }}
            />
          </SCCardTop>
          <SCCardMiddle>Placeholder</SCCardMiddle>
          <SCCardBottom>
            <SCCardTitle> Ginyu Transformation </SCCardTitle>
          </SCCardBottom>
        </SCCard>
        <SCCard lightColor="hsl(24deg 98% 40%)" intenseColor="hsl(19deg 100% 36%)">
          <SCCardTop>
            <SCCardImage
              src="mortal-kombat.jpg"
              transform="scale(0.08) translate(-9700px,-10000px)"
              alt="Mortal Kombat"
            />
          </SCCardTop>
          <SCCardMiddle>Placeholder</SCCardMiddle>
          <SCCardBottom>
            <SCCardTitle> Mortal Kombat </SCCardTitle>
          </SCCardBottom>
        </SCCard>
      </SCFlexWrapper>
    </Page>
  );
};

export default CardPage;

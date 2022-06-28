import React from 'react';
import Page from 'components/layout/Page';
import { SCFlexWrapper } from './styles';
import ExpandingCard from 'components/atoms/ExpandingCard';
import 'assets/img/ginyu.jpg';
import 'assets/img/mortal-kombat.jpg';

const CardPage = () => {
  return (
    <Page>
      <SCFlexWrapper>
        <ExpandingCard
          imgSrc="ginyu.jpg"
          imgAltSrc="Ginyu Transformation"
          imgTransform="scale(0.06) translate(-19700px, -19000px)"
          title="Giny Transformation"
          content="Placeholder"
        />
        <ExpandingCard
          imgSrc="mortal-kombat.jpg"
          imgAlt="Mortal Kombat"
          imgTransform="scale(0.08) translate(-9700px,-10000px)"
          title="Mortal Kombat"
          content="Placeholder"
        />
      </SCFlexWrapper>
    </Page>
  );
};

export default CardPage;

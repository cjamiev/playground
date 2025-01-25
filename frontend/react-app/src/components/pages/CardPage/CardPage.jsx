import React from 'react';
import Page from '../../layout/Page';
import { SCFlexWrapper } from './styles';
import ExpandingCard from '../../atoms/ExpandingCard';

const CardPage = () => {
  return (
    <Page>
      <SCFlexWrapper>
        <ExpandingCard
          imgAltSrc="Ginyu Transformation"
          imgTransform="scale(0.06) translate(-19700px, -19000px)"
          title="Giny Transformation"
          content="Placeholder"
        />
        <ExpandingCard
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

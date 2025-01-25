import React, { useState } from 'react';
import {
  SCExpandingCard,
  SCExpandingCardTop,
  SCExpandingCardImage,
  SCExpandingCardMiddle,
  SCExpandingCardBottom,
  SCExpandingCardTitle
} from './styles';

const ExpandingCard = ({ imgSrc, imgAltTxt, imgTransform, title, content }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SCExpandingCard>
      <SCExpandingCardTop>
        {isLoading && <div> Loading </div>}
        <SCExpandingCardImage
          src={imgSrc}
          alt={imgAltTxt}
          transform={imgTransform}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </SCExpandingCardTop>
      <SCExpandingCardMiddle>{content}</SCExpandingCardMiddle>
      <SCExpandingCardBottom>
        <SCExpandingCardTitle>{title}</SCExpandingCardTitle>
      </SCExpandingCardBottom>
    </SCExpandingCard>
  );
};

export default ExpandingCard;

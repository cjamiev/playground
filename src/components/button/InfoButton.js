import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InfoIcon } from 'components/icons';
import { openGlobalModal } from 'components/global/globalActions';

const INFO_HEIGHT = '39px';
const INFO_WIDTH = '39px';
const INFO_VIEWBOX = '0 0 106 106';

const InfoButton = ({ title = 'Info', content }) => {
  const dispatch = useDispatch();

  const showContent = () => {
    dispatch(
      openGlobalModal({
        title,
        message: content
      })
    );
  };

  return (
    <button className="btn btn__info-icon" onClick={showContent}>
      <svg height={INFO_HEIGHT} width={INFO_WIDTH} viewBox={INFO_VIEWBOX}>
        <InfoIcon />
      </svg>
    </button>
  );
};

export default InfoButton;

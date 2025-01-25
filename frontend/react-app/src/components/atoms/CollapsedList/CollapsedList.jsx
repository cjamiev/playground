import React, { useState } from 'react';
import { SCCollapsedList, SCCollapsedListLinks, SCCollapsedListShortLabel, SCCollapsedListLabel } from './styles';

const CollapsedList = ({ data }) => {
  const renderListItems = data.map((item) => {
    return (
      <SCCollapsedListLinks key={item.label} onClick={item.handleClick} isActive={item.isActive}>
        <SCCollapsedListShortLabel isActive={item.isActive}>{item.shortLabel}</SCCollapsedListShortLabel>
        <SCCollapsedListLabel>{item.label}</SCCollapsedListLabel>
      </SCCollapsedListLinks>
    );
  });

  return <SCCollapsedList>{renderListItems}</SCCollapsedList>;
};

export default CollapsedList;

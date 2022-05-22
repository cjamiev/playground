import React, { useState } from 'react';
import styled from 'styled-components';
import { Theme } from 'styles';
import { noop } from 'helper/noop';

export const SCTabButtonGroup = styled.div`
  display: flex;
  height: 50px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${Theme.primaryDarkColor};
`;

export const SCTabButton = styled.button`
  width: 120px;
  height: 30px;
  padding: 2px;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  background-color: ${Theme.primaryDarkColor};

  ${(props) =>
    props.isActive &&
    `
    color: hsl(240, 85%, 75%);
    background: ${Theme.secondaryDarkColor};
    box-shadow: 0px 2px 10px hsl(230, 85%, 75%);
    transform: translateY(1px);
  `};
`;

const ZERO = 0;

const Tabs = ({ data, onTabSwitch = noop }) => {
  const [tabIndex, setTabIndex] = useState(ZERO);
  const TabComponent = data[tabIndex].component;

  const renderTabs = data.map((tItem, tIndex) => {
    return (
      <SCTabButton
        key={tItem.title}
        isActive={tabIndex === tIndex}
        onClick={() => {
          setTabIndex(tIndex);
          onTabSwitch();
        }}
      >
        {tItem.title}
      </SCTabButton>
    );
  });

  return (
    <>
      <SCTabButtonGroup>{renderTabs}</SCTabButtonGroup>
      {<TabComponent />}
    </>
  );
};

export default Tabs;

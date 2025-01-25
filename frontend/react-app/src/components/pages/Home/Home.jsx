import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Page from '../../layout/Page';
import { openGlobalModal } from '../../molecules/Global/globalActions';
import { loadHome, updateHome } from './homeActions';
import { noop } from '../../../utils/noop';
import { SCHomeSidePanelWrapper, SCHomeSidePanelButton } from './styles';

const ZERO = 0;
const ONE = 1;

const HomePlaceHolderComponent = () => {
  const dispatch = useDispatch();
  const { homeData } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(loadHome());
  }, [dispatch]);

  const updateHomeModal = () => {
    dispatch(
      openGlobalModal({
        title: 'Modal Test',
        message: 'Increment or Decrement count',
        buttonList: [
          {
            label: 'Increment',
            isPrimary: true,
            action: () => {
              dispatch(
                updateHome({
                  ...homeData,
                  count: homeData.count + ONE
                })
              );
            }
          },
          {
            label: 'Decrement',
            isPrimary: true,
            action: () => {
              dispatch(
                updateHome({
                  ...homeData,
                  count: homeData.count - ONE
                })
              );
            }
          },
          {
            label: 'Cancel',
            isSecondary: true,
            action: noop
          }
        ]
      })
    );
  };

  return (
    <>
      <SCHomeSidePanelWrapper>
        <SCHomeSidePanelButton onClick={updateHomeModal}> Update Home Data</SCHomeSidePanelButton>
        <div> key:{homeData.testKey} </div>
        <div> count:{homeData.count} </div>
      </SCHomeSidePanelWrapper>
    </>
  );
};

const SCDiv = styled.div`
  font-size: 36px;
  color: ${(props) => (props.isRed ? 'red' : 'blue')};

  :hover {
    color: green;
  }
`;

const Home = () => {
  const [item, setItem] = useState('Test Red');

  return (
    <Page sidePanelContent={<HomePlaceHolderComponent />}>
      <SCDiv isRed={true}>{item}</SCDiv>
      <SCDiv isRed={false}>Test Blue</SCDiv>
    </Page>
  );
};

export default Home;

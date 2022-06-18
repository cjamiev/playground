import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/layout/Page';
import { openGlobalModal } from 'components/molecules/Global/globalActions';
import { loadHome, updateHome } from './homeActions';
import { noop } from 'utils/noop';
import { SCHomeButton } from './styles';

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
    <Page>
      <SCHomeButton onClick={updateHomeModal}> Update Home Data</SCHomeButton>
      <div> key:{homeData.testKey} </div>
      <div> count:{homeData.count} </div>
    </Page>
  );
};

const Home = () => {
  return <HomePlaceHolderComponent />;
};

export default Home;

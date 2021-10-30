import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadConfig, updateConfig } from './configActions';
import Page from 'components/layout';

const Config = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
  const { data } = useSelector(state => state.config);

  useEffect(() => {
    dispatch(loadConfig());
  }, [dispatch]);

  return (
    <Page>
      <p>config</p>
    </Page>
  );
};

export default Config;

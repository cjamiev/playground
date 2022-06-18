import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/layout';
import { updateSettings } from './settingsActions';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <Page>
      <div>Table</div>
    </Page>
  );
};

export default Settings;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from '../../layout/Alert/alertActions';
import Page from '../../layout';
import Tabs from '../../atoms/Tabs';
import Animation from './Animation';
import Form from './Form';
import Wizard from './Wizard';
import GlobalModal from './GlobalModal';
import Svg from './Svg';
import SvgCurve from './SvgCurve';

const TABS = [
  { title: 'Svg', component: Svg },
  { title: 'Curve', component: SvgCurve },
  { title: 'Animation', component: Animation },
  { title: 'Modal', component: GlobalModal },
  { title: 'Wizard', component: Wizard },
  { title: 'Form', component: Form }
];

const Experiment = () => {
  const dispatch = useDispatch();

  return (
    <Page>
      <Tabs
        data={TABS}
        onTabSwitch={() => {
          dispatch(dismissAlert());
        }}
      />
    </Page>
  );
};

export default Experiment;

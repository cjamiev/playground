import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import { dismissAlert } from 'components/layout/Alert/alertActions';
import Page from 'components/layout';
import Tabs from 'components/atoms/Tabs';
import TextArea from 'components/atoms/Form/TextArea';
import Animation from './Animation';
import DataGenerator from './DataGenerator';
import Form from './Form';
import Wizard from './Wizard';
import GlobalModal from './GlobalModal';
import Svg from './Svg';
import SvgCurve from './SvgCurve';
import { noop } from 'utils/noop';

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

import React, { useState } from 'react';
import Page from 'components/layout';
import Wizard from 'components/wizard';

const Home = () => {
  const data = [
    (<div>content1</div>),
    (<div>content2</div>),
    (<div>content3</div>),
    (<div>content4</div>)
  ];


  return (
    <Page >
      <Wizard title="Wizard Page Title" data={data} onSubmit={() => { console.log('submit');}}/>
    </ Page>
  );
};

export default Home;

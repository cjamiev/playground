import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { load{{Name}}, update{{Name}} } from './{{name}}Actions';
import Page from 'components/layout';

const {{Name}} = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
  const { data } = useSelector((state) => state.{{name}});

  useEffect(() => {
    dispatch(load{{Name}}());
  }, [dispatch]);

  return (
    <Page sidePanelContent={<p>fill</p>}>
      <p>{{name}}</p>
    </Page>
  );
};

export default {{Name}};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFilesFromTemplates } from './templateActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';

const ONE = 1;

const Template = ({ root }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const { templates } = useSelector(state => state.project);

  useEffect(() => {
    console.log('EYE_CATCHER', templates);
    setSelectedTemplates(templates.map(item => {
      return { label: item, value: item, selected: false};
    }));
  }, [templates]);

  return (
    <div className="flex--vertical">
      <Text
        label="Name"
        selected={name}
        onChange={({ selected }) => {
          setName(selected);
        }}
      />
      <Checkbox
        label='Templates'
        values={selectedTemplates}
        onChange={({ values }) => {
          setSelectedTemplates(values);
        }}
      />
      <Button
        classColor="secondary"
        label="Create"
        onClick={() => {
          if(name) {
            dispatch(createFilesFromTemplates(
              root,
              name,
              selectedTemplates.filter(item => item.selected).map(item => item.label)
            ));
          }
        }}
      />
    </div>
  );
};

export default Template;

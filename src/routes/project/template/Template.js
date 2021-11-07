import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFilesFromTemplates } from './templateActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';

const ZERO = 0;
const ONE = 1;

const Template = ({ root }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const { templates } = useSelector(state => state.project);

  useEffect(() => {
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
      <Button
        classColor="secondary"
        label={selectedTemplates.some(entry => !entry.selected) ? 'Select All': 'Unselect All'}
        onClick={() => {
          if(selectedTemplates.some(entry => !entry.selected)) {
            setSelectedTemplates(selectedTemplates.map(entry => ({ ...entry, selected: true })));
          } else {
            setSelectedTemplates(selectedTemplates.map(entry => ({ ...entry, selected: false })));
          }
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
        classColor="primary"
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

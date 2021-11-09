import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTemplate, createFilesFromTemplates } from './templateActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';
import TextArea from 'components/form/TextArea';


const ZERO = 0;
const ONE = 1;

const Template = ({ root }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const { templates } = useSelector(state => state.project);

  useEffect(() => {
    setSelectedTemplates(templates.map(item => {
      return { label: item, value: item, selected: false};
    }));
  }, [templates]);

  return (
    <div className="flex--horizontal">
      <div className="flex--vertical">
        <Text
          label="Name"
          selected={name}
          onChange={({ selected }) => {
            setName(selected);
          }}
        />
        <Button
          label="Add"
          classColor="secondary"
          onClick={() => {
            if(name && content) {
              dispatch(createTemplate(name, content));
            }
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
      <div className="snippet__file-area">
        <TextArea
          ariaLabel="Enter File"
          selected={content}
          onChange={({ selected }) => { setContent(selected); }}
        />
      </div>
    </div>
  );
};

export default Template;

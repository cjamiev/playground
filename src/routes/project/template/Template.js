import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTemplate, createTemplate, createFilesFromTemplates } from './templateActions';
import Button from 'components/button';
import Text from 'components/form/Text';
import Checkbox from 'components/form/Checkbox';
import TextArea from 'components/form/TextArea';


const ZERO = 0;
const ONE = 1;

const Template = ({ root }) => {
  const dispatch = useDispatch();
  const [generatedName, setGeneratedName] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const { templates, templateFile } = useSelector(state => state.project);

  useEffect(() => {
    setSelectedTemplates(templates.map(item => {
      return { label: item, value: item, selected: false};
    }));
  }, [templates]);

  useEffect(() => {
    setContent(templateFile);
  }, [templateFile]);

  const fileButtons = templates.map(label => {
    return <Button
      key={label}
      label={label}
      className="load-file__btns"
      onClick={() => {
        dispatch(loadTemplate(label));
      }}
    />;
  });

  return (
    <div className="flex--horizontal">
      <div className="flex--vertical flex--one">
        <h2>Generate Files</h2>
        <Text
          label="Generated Name"
          selected={generatedName}
          onChange={({ selected }) => {
            setGeneratedName(selected);
          }}
        />
        <Checkbox
          label='Templates'
          values={selectedTemplates}
          onChange={({ values }) => {
            setSelectedTemplates(values);
          }}
        />
        <div className="flex--horizontal">
          <Button
            classColor="primary"
            label="Create"
            onClick={() => {
              const generatedList = selectedTemplates.filter(item => item.selected).map(item => item.label);
              if(generatedName && generatedList.length) {
                dispatch(createFilesFromTemplates(
                  root,
                  generatedName,
                  generatedList
                ));
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
        </div>
      </div>
      <div className="flex--horizontal flex--three">
        <div className="flex--vertical">
          <h2 className="horizontal-center">Load File</h2>
          {fileButtons}
        </div>
        <div className="project__file-area">
          <TextArea
            ariaLabel="Enter Content"
            selected={content}
            onChange={({ selected }) => { setContent(selected); }}
          />
        </div>
        <div className="flex--vertical">
          <h2>Create Template</h2>
          <Text
            label="Template Name"
            selected={templateName}
            onChange={({ selected }) => {
              setTemplateName(selected);
            }}
          />
          <Button
            label="Create New"
            classColor="secondary"
            onClick={() => {
              if(templateName && content) {
                dispatch(createTemplate(templateName, content));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Template;

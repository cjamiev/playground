import React from 'react';
import Dropdown from 'components/form/Dropdown';
import Button from 'components/button';
import Text from 'components/form/Text';
import { copyToClipboard } from 'helper/copy';

const GeneratorSidePanel = ({
  generatorRecords,
  selectedName,
  onSelectRecord,
  onSubmit,
  onDelete,
  normalCSS,
  hoverCSS,
  activeCSS,
  copyCSS
}) => {
  return (
    <div className="container--center">
      <Dropdown
        label="Select an existing record"
        values={generatorRecords}
        onChange={({ values }) => {
          const selectedRecord = values.find((item) => item.selected);
          onSelectRecord(selectedRecord.label);
        }}
      />
      <Text
        placeholder="Name"
        selected={selectedName}
        onChange={({ selected }) => {
          onSelectRecord(selected);
        }}
      />
      <Button
        classColor="primary"
        label="Save"
        onClick={() => {
          onSubmit(selectedName);
        }}
      />
      <Button
        classColor="primary"
        label="Delete"
        onClick={() => {
          onDelete(selectedName);
        }}
      />
      <Button
        label="Copy"
        classColor="primary"
        onClick={() => {
          copyToClipboard(copyCSS);
        }}
      />
      <h2>Normal CSS</h2>
      <pre className="generator__generated_css">{normalCSS}</pre>
      <h2>Hover CSS</h2>
      <pre className="generator__generated_css">{hoverCSS}</pre>
      <h2>Active CSS</h2>
      <pre className="generator__generated_css">{activeCSS}</pre>
    </div>
  );
};

export default GeneratorSidePanel;

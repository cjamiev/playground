import React from 'react';
import Dropdown from 'components/form/Dropdown';
import Text from 'components/form/Text';
import { copyToClipboard } from 'helper/copy';
import { SaveSVG } from 'components/icons/SaveSVG';
import { CopyFileSVG } from 'components/icons/CopyFileSVG';
import { TrashSVG } from 'components/icons';

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
      <svg
        aria-label="Save"
        width="53"
        height="53"
        viewBox="0 0 90 90"
        onClick={() => {
          onSubmit(selectedName);
        }}
      >
        <SaveSVG />
      </svg>
      <svg
        aria-label="Delete"
        width="53"
        height="53"
        viewBox="0 0 90 90"
        onClick={() => {
          onDelete(selectedName);
        }}
      >
        <TrashSVG />
      </svg>
      <svg
        aria-label="Copy"
        width="53"
        height="53"
        viewBox="0 0 90 90"
        onClick={() => {
          copyToClipboard(copyCSS);
        }}
      >
        <CopyFileSVG />
      </svg>
      <h2>Normal CSS</h2>
      <pre className="generator__printed-css">{normalCSS}</pre>
      <h2>Hover CSS</h2>
      <pre className="generator__printed-css">{hoverCSS}</pre>
      <h2>Active CSS</h2>
      <pre className="generator__printed-css">{activeCSS}</pre>
    </div>
  );
};

export default GeneratorSidePanel;

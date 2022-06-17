import React from 'react';
import Dropdown from 'components/atoms/Form/Dropdown';
import Text from 'components/atoms/Form/Text';
import { copyToClipboard } from 'utils/copy';
import { SaveSVG } from 'components/atoms/Icons/SaveSVG';
import { CopySVG } from 'components/atoms/Icons/CopySVG';
import { TrashSVG } from 'components/atoms/Icons';
import { SCDataBtnWrapper } from './styles';

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
      <SCDataBtnWrapper>
        <SaveSVG
          viewBox="0 0 80 80"
          onClick={() => {
            onSubmit(selectedName);
          }}
        />
        <TrashSVG
          viewBox="0 0 80 80"
          onClick={() => {
            onDelete(selectedName);
          }}
        />
        <CopySVG
          ariaLabel="Copy css"
          viewBox="0 0 80 80"
          onClick={() => {
            copyToClipboard(copyCSS);
          }}
        />
      </SCDataBtnWrapper>
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

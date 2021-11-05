import React from 'react';
import Dropdown from 'components/form/Dropdown';
import { IconButton} from 'components/button';
import Text from 'components/form/Text';
import { copyToClipboard } from 'helper/copy';
import { ICON_TYPES } from 'constants/icon';

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
      <IconButton
        type={ICON_TYPES.SAVE}
        onClick={() => {
          onSubmit(selectedName);
        }}
      />
      <IconButton
        type={ICON_TYPES.TRASH}
        onClick={() => {
          onDelete(selectedName);
        }}
      />
      <IconButton
        type={ICON_TYPES.COPY}
        onClick={() => {
          copyToClipboard(copyCSS);
        }}
      />
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

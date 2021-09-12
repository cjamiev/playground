import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/layout';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import { AccordionGroup } from 'components/accordion';
import Range from 'components/form/Range';
import Switch from 'components/switch';
import GeneratorForm from './GeneratorForm';
import GeneratorSidePanel from './GeneratorSidePanel';
import { loadGeneratorRecords, updatedGeneratorRecords } from './generatorActions';
import { copyToClipboard } from 'helper/copy';
import { getCurrentStyles } from './helper';
import { ALL_CSS } from 'constants/css';
import './generator.css';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const Generator = () => {
  const [mode, setMode] = useState(ZERO);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [normalStyle, setNormalStyle] = useState({
    ...ALL_CSS,
    borderThickness: '1',
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '100',
    height: '50'
  });
  const [hoverStyle, setHoverStyle] = useState(ALL_CSS);
  const [activeStyle, setActiveStyle] = useState(ALL_CSS);
  const [parentBackgroundColor, setParentBackgroundColor] = useState('#ffffff');
  const dispatch = useDispatch();
  const { generatorRecords } = useSelector(state => state.generator);

  useEffect(() => {
    dispatch(loadGeneratorRecords());
  }, [dispatch]);

  const isHoverMode = mode === ONE;
  const isActiveMode = mode === TWO;
  const {
    normalCSS,
    hoverCSS,
    activeCSS,
    currentInlineStyle,
    currentStyle,
    ariaLabel
  } = getCurrentStyles({ normalStyle, hoverStyle, activeStyle, isHoverMode, isHovering, isActiveMode, isActive });
  const copyCSS = `.name {\n${normalCSS}\n}\n\n.name:hover {\n${hoverCSS}\n}\n\n.name:active {\n${activeCSS}\n}`;

  const handleChange = ({ id, selected, values }) => {
    if(isHoverMode) {
      const updatedStyle = values ?
        {
          ...hoverStyle,
          [id]: values.find(item => item.selected).label
        }
        : {
          ...hoverStyle,
          [id]: selected
        };
      setHoverStyle(updatedStyle);
    }
    else if(isActiveMode) {
      const updatedStyle = values ?
        {
          ...activeStyle,
          [id]: values.find(item => item.selected).label
        }
        : {
          ...activeStyle,
          [id]: selected
        };
      setActiveStyle(updatedStyle);
    }
    else {
      const updatedStyle = values ?
        {
          ...normalStyle,
          [id]: values.find(item => item.selected).label
        }
        : {
          ...normalStyle,
          [id]: selected
        };
      setNormalStyle(updatedStyle);
    }
  };

  const handleParentBackgroundColorChange = ({ selected }) => {
    setParentBackgroundColor(selected);
  };

  const handleMode = (index) => {
    setMode(index);
  };

  const handleSelectRecord = (name) => {
    const matched = generatorRecords.find(item => item.name === name);
    setNormalStyle(matched.value.normalStyle);
    setHoverStyle(matched.value.hoverStyle);
    setActiveStyle(matched.value.activeStyle);
    setParentBackgroundColor(matched.value.parentBackgroundColor);
  };

  const handleSubmit = (name) => {
    const filteredRecords = generatorRecords.filter(item => item.name !== name);
    const updatedRecords = [...filteredRecords, { name, value: { normalStyle, hoverStyle, activeStyle, parentBackgroundColor }}];

    dispatch(updatedGeneratorRecords(updatedRecords));
  };

  const handleDelete = (name) => {
    const filteredRecords = generatorRecords.filter(item => item.name !== name);

    dispatch(updatedGeneratorRecords(filteredRecords));
  };

  const records = generatorRecords.map(item => {
    return { label: item.name, selected: false };
  });

  return (
    <Page sidePanelContent={<GeneratorSidePanel records={records} onSelectRecord={handleSelectRecord} onSubmit={handleSubmit} onDelete={handleDelete} />} >
      <div className="generator">
        <div className="generator__form_container">
          <Switch data={[{ label: 'Normal'}, { label: 'Hover'}, { label: 'Active'}]} switchIndex={mode} onToggleSwitch={handleMode} />
          <GeneratorForm style={currentStyle} onChange={handleChange} />
        </div>
        <div className="generator__result_container">
          <Color label="Parent Color" selected={parentBackgroundColor} onChange={handleParentBackgroundColorChange} />
          <div style={{ backgroundColor: parentBackgroundColor }} className="generator__box_parent">
            <div
              style={currentInlineStyle}
              aria-label={ariaLabel}
              onMouseOver={() => { !isHoverMode && setIsHovering(true);}}
              onMouseOut={() => {
                !isHoverMode && setIsHovering(false);
                !isActiveMode && setIsActive(false);
              }}
              onMouseDown={() => { !isActiveMode && setIsActive(true);}}
              onMouseUp={() => {!isActiveMode && setIsActive(false);}}>
              Test Area
            </div>
          </div>
        </div>
        <div className="generator__output_container">
          <Button
            label="Copy"
            classColor="primary"
            onClick={
              () => { copyToClipboard(copyCSS); }
            } />
          <h2>Normal CSS</h2>
          <pre className="generator__generated_css">{normalCSS}</pre>
          <h2>Hover CSS</h2>
          <pre className="generator__generated_css">{hoverCSS}</pre>
          <h2>Active CSS</h2>
          <pre className="generator__generated_css">{activeCSS}</pre>
        </div>
      </div>
    </Page>
  );
};

export default Generator;

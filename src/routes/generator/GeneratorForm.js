import React from 'react';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color, { hexToRGB } from 'components/form/Color';
import { AccordionGroup } from 'components/accordion';
import Range from 'components/form/Range';
import {
  THICKNESS_MAX,
  OPACITY_MAX,
  FONT_SIZE_MAX,
  WIDTH_MAX,
  HEIGHT_MAX,
  BORDER_TYPES,
  TEXT_ALIGN_TYPES
} from 'constants/css';

const GeneratorForm = ({ style, onChange }) => {
  const handleChange = ({ id, selected, values }) => {
    const updatedStyle = values ?
      {
        ...style,
        [id]: values.find(item => item.selected).label
      }
      : {
        ...style,
        [id]: selected
      };

    onChange(updatedStyle);
  };

  const borderValues = BORDER_TYPES.map(item => (item.label === style.borderStyle ? { ...item, selected: true } : item));
  const textAlignValues = TEXT_ALIGN_TYPES.map(item => (item.label === style.textAlign ? { ...item, selected: true } : item));

  return (
    <AccordionGroup
      data={[
        { label: 'Border', content:
          (<>
            <Range id='borderThickness' label="Thickness" min="0" max={THICKNESS_MAX} selected={style.borderThickness} onChange={handleChange} />
            <Dropdown id='borderStyle' label={`Type: ${style.borderStyle}`} values={borderValues} onChange={handleChange} />
            <Color id='borderColor' label="Color" selected={style.borderColor} onChange={handleChange} />
          </>)
        },
        { label: 'Border Radius', content:
          (<>
            <Text id='topLeftRadius' label='Top Left' selected={style.topLeftRadius} onChange={handleChange} />
            <Text id='topRightRadius' label='Top Right' selected={style.topRightRadius} onChange={handleChange} />
            <Text id='bottomRightRadius' label='Bottom Right' selected={style.bottomRightRadius} onChange={handleChange} />
            <Text id='bottomLeftRadius' label='Bottom Left' selected={style.bottomLeftRadius} onChange={handleChange} />
          </>)
        },
        { label: 'Box Shadow', content:
          (<>
            <Text id='horizontalBoxShadow' label='Horizontal' selected={style.horizontalBoxShadow} onChange={handleChange} />
            <Text id='verticalBoxShadow' label='Vertical' selected={style.verticalBoxShadow} onChange={handleChange} />
            <Text id='blurRadiusBoxShadow' label='Blur Radius' selected={style.blurRadiusBoxShadow} onChange={handleChange} />
            <Text id='spreadBoxShadow' label='Spread' selected={style.spreadBoxShadow} onChange={handleChange} />
            <Color id='colorBoxShadow' label="Color" selected={style.colorBoxShadow} onChange={handleChange} />
          </>)
        },
        { label: 'Color', content:
          (<>
            <Color id='backgroundColor' label="BG Color" selected={style.backgroundColor} onChange={handleChange} />
            <Range id='opacity' label="Opacity" min="0" max={OPACITY_MAX} selected={style.opacity} onChange={handleChange} />
          </>)
        },
        { label: 'Text', content:
          (<>
            <Color id='fontColor' label="Font Color" selected={style.fontColor} onChange={handleChange} />
            <Range id='fontSize' label="Font Size" min="0" max={FONT_SIZE_MAX} selected={style.fontSize} onChange={handleChange} />
            <Dropdown id='textAlign' label={`Text Align: ${style.textAlign}`} values={textAlignValues} onChange={handleChange} />
            <Text id='horizontalTextShadow' label='Horizontal' selected={style.horizontalTextShadow} onChange={handleChange} />
            <Text id='verticalTextShadow' label='Vertical' selected={style.verticalTextShadow} onChange={handleChange} />
            <Text id='blurRadiusTextShadow' label='Blur Radius' selected={style.blurRadiusTextShadow} onChange={handleChange} />
            <Color id='colorTextShadow' label="Text Shadow Color" selected={style.colorTextShadow} onChange={handleChange} />
          </>)
        },
        { label: 'Transform', content:
          (<>
            <Text id='rotate' label='rotate' selected={style.rotate} onChange={handleChange} />
            <Text id='translateX' label='translateX' selected={style.translateX} onChange={handleChange} />
            <Text id='translateY' label='translateY' selected={style.translateY} onChange={handleChange} />
            <Text id='scaleX' label='scaleX' selected={style.scaleX} onChange={handleChange} />
            <Text id='scaleY' label='scaleY' selected={style.scaleY} onChange={handleChange} />
            <Text id='skewX' label='skewX' selected={style.skewX} onChange={handleChange} />
            <Text id='skewY' label='skewY' selected={style.skewY} onChange={handleChange} />
          </>)
        },
        { label: 'Margin', content:
          (<>
            <Text id='marginTop' label='Top' selected={style.marginTop} onChange={handleChange} />
            <Text id='marginRight' label='Right' selected={style.marginRight} onChange={handleChange} />
            <Text id='marginBottom' label='Bottom' selected={style.marginBottom} onChange={handleChange} />
            <Text id='marginLeft' label='Left' selected={style.marginLeft} onChange={handleChange} />
          </>)
        },
        { label: 'Padding', content:
          (<>
            <Text id='paddingTop' label='Top' selected={style.paddingTop} onChange={handleChange} />
            <Text id='paddingRight' label='Right' selected={style.paddingRight} onChange={handleChange} />
            <Text id='paddingBottom' label='Bottom' selected={style.paddingBottom} onChange={handleChange} />
            <Text id='paddingLeft' label='Left' selected={style.paddingLeft} onChange={handleChange} />
          </>)
        },
        { label: 'Size', content:
          (<>
            <Text id='width' label="Width" selected={style.width} onChange={handleChange} />
            <Text id='height' label='Height' selected={style.height} onChange={handleChange} />
          </>)
        }
      ]} />
  );
};

export default GeneratorForm;

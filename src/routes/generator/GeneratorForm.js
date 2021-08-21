import React from 'react';
import Text from 'components/form/Text';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import { AccordionGroup } from 'components/accordion';
import Range from 'components/form/Range';
import {
  THICKNESS_MAX,
  OPACITY_MAX,
  FONT_SIZE_MAX,
  WIDTH_MAX,
  HEIGHT_MAX,
  BORDER_TYPES,
  TEXT_ALIGN_TYPES,
  TRANSITION_TIMING_FUNCTION
} from 'constants/css';

const GeneratorForm = ({ style, onChange }) => {
  const borderValues = BORDER_TYPES.map(item => (item.label === style.borderStyle ? { ...item, selected: true } : item));
  const textAlignValues = TEXT_ALIGN_TYPES.map(item => (item.label === style.textAlign ? { ...item, selected: true } : item));
  const transitionTimingFunctionValues = TRANSITION_TIMING_FUNCTION.map(item => (item.label === style.transitionTimingFunction ? { ...item, selected: true } : item));

  return (
    <AccordionGroup
      data={[
        { label: 'Border', content:
          (<>
            <Range id='borderThickness' label="Thickness" min="0" max={THICKNESS_MAX} selected={style.borderThickness} onChange={onChange} />
            <Dropdown id='borderStyle' label={`Type: ${style.borderStyle || ''}`} values={borderValues} onChange={onChange} />
            <Color id='borderColor' label="Color" selected={style.borderColor} onChange={onChange} />
          </>)
        },
        { label: 'Border Radius', content:
          (<>
            <Text id='topLeftRadius' label='Top Left' selected={style.topLeftRadius} onChange={onChange} />
            <Text id='topRightRadius' label='Top Right' selected={style.topRightRadius} onChange={onChange} />
            <Text id='bottomRightRadius' label='Bottom Right' selected={style.bottomRightRadius} onChange={onChange} />
            <Text id='bottomLeftRadius' label='Bottom Left' selected={style.bottomLeftRadius} onChange={onChange} />
          </>)
        },
        { label: 'Box Shadow', content:
          (<>
            <Text id='horizontalBoxShadow' label='Horizontal' selected={style.horizontalBoxShadow} onChange={onChange} />
            <Text id='verticalBoxShadow' label='Vertical' selected={style.verticalBoxShadow} onChange={onChange} />
            <Text id='blurRadiusBoxShadow' label='Blur Radius' selected={style.blurRadiusBoxShadow} onChange={onChange} />
            <Text id='spreadBoxShadow' label='Spread' selected={style.spreadBoxShadow} onChange={onChange} />
            <Color id='colorBoxShadow' label="Color" selected={style.colorBoxShadow} onChange={onChange} />
          </>)
        },
        { label: 'Color', content:
          (<>
            <Color id='backgroundColor' label="BG Color" selected={style.backgroundColor} onChange={onChange} />
            <Range id='opacity' label="Opacity" min="0" max={OPACITY_MAX} selected={style.opacity} onChange={onChange} />
          </>)
        },
        { label: 'Text', content:
          (<>
            <Color id='fontColor' label="Font Color" selected={style.fontColor} onChange={onChange} />
            <Range id='fontSize' label="Font Size" min="0" max={FONT_SIZE_MAX} selected={style.fontSize} onChange={onChange} />
            <Dropdown id='textAlign' label={`Text Align: ${style.textAlign || ''}`} values={textAlignValues} onChange={onChange} />
            <Text id='horizontalTextShadow' label='Horizontal' selected={style.horizontalTextShadow} onChange={onChange} />
            <Text id='verticalTextShadow' label='Vertical' selected={style.verticalTextShadow} onChange={onChange} />
            <Text id='blurRadiusTextShadow' label='Blur Radius' selected={style.blurRadiusTextShadow} onChange={onChange} />
            <Color id='colorTextShadow' label="Text Shadow Color" selected={style.colorTextShadow} onChange={onChange} />
          </>)
        },
        { label: 'Filter', content:
          (<>
            <Text id='blur' label='blur' selected={style.blur} onChange={onChange} />
            <Text id='brightness' label='brightness' selected={style.brightness} onChange={onChange} />
            <Text id='contrast' label='contrast' selected={style.contrast} onChange={onChange} />
            <Text id='grayscale' label='grayscale' selected={style.grayscale} onChange={onChange} />
            <Text id='hueRotate' label='hue rotate' selected={style.hueRotate} onChange={onChange} />
            <Text id='invert' label='invert' selected={style.invert} onChange={onChange} />
            <Text id='saturate' label='saturate' selected={style.saturate} onChange={onChange} />
          </>)
        },
        { label: 'Transform', content:
          (<>
            <Text id='rotate' label='rotate' selected={style.rotate} onChange={onChange} />
            <Text id='translateX' label='translateX' selected={style.translateX} onChange={onChange} />
            <Text id='translateY' label='translateY' selected={style.translateY} onChange={onChange} />
            <Text id='scaleX' label='scaleX' selected={style.scaleX} onChange={onChange} />
            <Text id='scaleY' label='scaleY' selected={style.scaleY} onChange={onChange} />
            <Text id='skewX' label='skewX' selected={style.skewX} onChange={onChange} />
            <Text id='skewY' label='skewY' selected={style.skewY} onChange={onChange} />
          </>)
        },
        { label: 'Transition', content:
          (<>
            <Text id='transitionProperty' label='Transition Property' selected={style.transitionProperty} onChange={onChange} />
            <Text id='transitionDuration' label='Transition Duration' selected={style.transitionDuration} onChange={onChange} />
            <Dropdown id='transitionTimingFunction' label={`Transition Timing Function:${style.transitionTimingFunction || ''}`} values={transitionTimingFunctionValues} onChange={onChange} />
            <Text id='transitionDelay' label='Transition Delay' selected={style.transitionDelay} onChange={onChange} />
          </>)
        },
        { label: 'Margin', content:
          (<>
            <Text id='marginTop' label='Top' selected={style.marginTop} onChange={onChange} />
            <Text id='marginRight' label='Right' selected={style.marginRight} onChange={onChange} />
            <Text id='marginBottom' label='Bottom' selected={style.marginBottom} onChange={onChange} />
            <Text id='marginLeft' label='Left' selected={style.marginLeft} onChange={onChange} />
          </>)
        },
        { label: 'Padding', content:
          (<>
            <Text id='paddingTop' label='Top' selected={style.paddingTop} onChange={onChange} />
            <Text id='paddingRight' label='Right' selected={style.paddingRight} onChange={onChange} />
            <Text id='paddingBottom' label='Bottom' selected={style.paddingBottom} onChange={onChange} />
            <Text id='paddingLeft' label='Left' selected={style.paddingLeft} onChange={onChange} />
          </>)
        },
        { label: 'Size', content:
          (<>
            <Text id='width' label="Width" selected={style.width} onChange={onChange} />
            <Text id='height' label='Height' selected={style.height} onChange={onChange} />
          </>)
        }
      ]} />
  );
};

export default GeneratorForm;

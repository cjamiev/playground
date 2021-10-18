import React from 'react';
import {
  MinusIcon,
  PlusIcon,
  ArrowIcon,
  CloseIcon,
  CopyIcon,
  EditIcon,
  SaveIcon,
  TrashIcon,
  TripleBarIcon,
  SemicircleArrowIcon
} from 'components/icons';
import { ICON_TYPES, ICON_SIZES } from 'constants/icon';
import ComponentWrapper from 'components/ComponentWrapper';

const ICON_HEIGHT = '53px';
const ICON_WIDTH = '53px';
const ICON_VIEWBOX = '0 0 53 53';
const iconMap = {
  [ICON_TYPES.MINUS]: MinusIcon,
  [ICON_TYPES.PLUS]: PlusIcon,
  [ICON_TYPES.COPY]: CopyIcon,
  [ICON_TYPES.CLOSE]: CloseIcon,
  [ICON_TYPES.EDIT]: EditIcon,
  [ICON_TYPES.UP_ARROW]: ComponentWrapper(ArrowIcon, { up: true }),
  [ICON_TYPES.DOWN_ARROW]: ComponentWrapper(ArrowIcon, { down: true }),
  [ICON_TYPES.LEFT_ARROW]: ComponentWrapper(ArrowIcon, { left: true }),
  [ICON_TYPES.RIGHT_ARROW]: ComponentWrapper(ArrowIcon, { right: true }),
  [ICON_TYPES.SAVE]: SaveIcon,
  [ICON_TYPES.TRASH]: TrashIcon,
  [ICON_TYPES.TRIPLE_BAR]: TripleBarIcon,
  [ICON_TYPES.REDO]: ComponentWrapper(SemicircleArrowIcon, { redo: true }),
  [ICON_TYPES.UNDO]: ComponentWrapper(SemicircleArrowIcon, { undo: true })
};

const SCALE_SIZES = {
  [ICON_SIZES.EXTRA_SMALL]: 'scale(0.5)',
  [ICON_SIZES.SMALL]: 'scale(0.8)',
  [ICON_SIZES.MEDIUM]: 'scale(1)',
  [ICON_SIZES.LARGE]: 'scale(1.2)',
  [ICON_SIZES.EXTRA_LARGE]: 'scale(1.5)'
};

const IconButton = ({ type, size = 'm', onClick }) => {
  const IconSVG = iconMap.hasOwnProperty(type) ? iconMap[type] : null;

  return (
    <button className="btn--icon" onClick={onClick}>
      <svg height={ICON_HEIGHT} width={ICON_WIDTH} viewBox={ICON_VIEWBOX}>
        <g transform={SCALE_SIZES[size]}>
          <IconSVG />
        </g>
      </svg>
    </button>
  );
};

export default IconButton;

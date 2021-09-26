import React from 'react';
import {
  MinusIcon,
  PlusIcon,
  ArrowIcon,
  CloseIcon,
  EditIcon,
  TrashIcon,
  TripleBarIcon
} from 'components/icons';
import { ICON_TYPES } from 'constants/icon';
import ComponentWrapper from 'components/ComponentWrapper';

const ICON_HEIGHT = '53px';
const ICON_WIDTH = '53px';
const ICON_VIEWBOX = '0 0 53 53';
const iconMap = {
  [ICON_TYPES.MINUS]: MinusIcon,
  [ICON_TYPES.CLOSE]: CloseIcon,
  [ICON_TYPES.PLUS]: PlusIcon,
  [ICON_TYPES.EDIT]: EditIcon,
  [ICON_TYPES.UP_ARROW]: ComponentWrapper(ArrowIcon, { up: true}),
  [ICON_TYPES.DOWN_ARROW]: ComponentWrapper(ArrowIcon, { down: true}),
  [ICON_TYPES.LEFT_ARROW]: ComponentWrapper(ArrowIcon, { left: true}),
  [ICON_TYPES.RIGHT_ARROW]: ComponentWrapper(ArrowIcon, { right: true}),
  [ICON_TYPES.TRASH]: TrashIcon,
  [ICON_TYPES.TRIPLE_BAR]: TripleBarIcon
};

const IconButton = ({ type, onClick}) => {
  const IconSVG = iconMap.hasOwnProperty(type) ? iconMap[type] : null;

  return (
    <button className="btn btn--icon" onClick={onClick}>
      <svg
        height={ICON_HEIGHT}
        width={ICON_WIDTH}
        viewBox={ICON_VIEWBOX}
      >
        <IconSVG />
      </svg>
    </button>
  );
};

export default IconButton;

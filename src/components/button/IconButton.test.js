import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import IconButton from './IconButton';
import { ICON_TYPES } from 'constants/icon';

const iconMap = {
  [ICON_TYPES.MINUS]: 'minus',
  [ICON_TYPES.PLUS]: 'plus',
  [ICON_TYPES.COPY]: 'copy',
  [ICON_TYPES.CLOSE]: 'close',
  [ICON_TYPES.EDIT]: 'edit',
  [ICON_TYPES.UP_ARROW]: 'up arrow',
  [ICON_TYPES.DOWN_ARROW]: 'down arrow',
  [ICON_TYPES.LEFT_ARROW]: 'left arrow',
  [ICON_TYPES.RIGHT_ARROW]: 'right arrow',
  [ICON_TYPES.SAVE]: 'save',
  [ICON_TYPES.TRASH]: 'trash',
  [ICON_TYPES.TRIPLE_BAR]: 'triple bar',
  [ICON_TYPES.UNDO]: 'undo'
};

const defaultProps = {
  onClick: jest.fn()
};

describe('IconButton', () => {
  Object.keys(iconMap).forEach(key => {
    it(`render ${key} icon`, () => {
      simpleTestWrapper(IconButton, { ...defaultProps, type: key});

      fireEvent.click(screen.getByLabelText(iconMap[key]));
      expect(defaultProps.onClick).toHaveBeenCalled();
    });
  });
});

import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockLocalStorage } from 'testHelper';
import Generator from './Generator';
import { ALL_CSS } from 'constants/css';

const pathname = '/generator';
const cachedGenerator = {
  normalStyle: {
    ...ALL_CSS,
    borderThickness: '1',
    borderStyle: 'solid',
    borderColor: '#000000',
    width: '100',
    height: '50'
  },
  hoverStyle: {
    ...ALL_CSS,
    backgroundColor: '#ff8a8a'
  },
  activeStyle: {
    ...ALL_CSS,
    blur: '5'
  },
  parentBackgroundColor: '#ffffff'
};
mockLocalStorage({
  generator: JSON.stringify(cachedGenerator)
});

describe('Generator', () => {
  it('handle Load', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    expect(screen.queryByText('background-color: rgba(255,138,138);')).not.toBeInTheDocument();

    const loadBtn = screen.getByText('Load');
    fireEvent.click(loadBtn);

    expect(screen.getByText('background-color: rgba(255,138,138);')).toBeInTheDocument();
  });

  it('handle cache', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    const cacheBtn = screen.getByText('Cache');
    fireEvent.click(cacheBtn);
    const result = JSON.parse(localStorage.getItem('generator'));

    expect(result.hoverStyle).toEqual(ALL_CSS);
    expect(result.activeStyle).toEqual(ALL_CSS);
  });

  it('handle copy', () => {
    document.execCommand = jest.fn();
    reduxTestWrapper(Generator, {}, {}, pathname);

    const copyBtn = screen.getByText('Copy');
    fireEvent.click(copyBtn);

    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('handleMode change', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    expect(screen.getByLabelText('Normal mode is on')).toBeInTheDocument();

    const hoverSwitch = screen.getByText('Hover');
    fireEvent.click(hoverSwitch);
    expect(screen.getByLabelText('Hover mode is on')).toBeInTheDocument();

    const activeSwitch = screen.getByText('Active');
    fireEvent.click(activeSwitch);
    expect(screen.getByLabelText('Active mode is on')).toBeInTheDocument();
  });

  it('handleParentBackgroundColorChange change', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    const parentColorField = screen.getByLabelText('Parent Color color field has value #ffffff');
    fireEvent.change(parentColorField, { target: { value: '#000000' } });

    expect(screen.getByLabelText('Parent Color color field has value #000000')).toBeInTheDocument();
  });

  it('handle onMouseOver & onMouseDown then onMouseOut & onMouseUp', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    const testArea = screen.getByText('Test Area');
    fireEvent.mouseOver(testArea);
    fireEvent.mouseDown(testArea);

    expect(screen.getByLabelText('isHovering and isActive effect is on')).toBeInTheDocument();

    fireEvent.mouseOut(testArea);
    fireEvent.mouseUp(testArea);

    expect(screen.getByLabelText('normal effect is on')).toBeInTheDocument();
  });
});
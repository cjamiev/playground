import api from 'api';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockLocalStorage } from 'testHelper';
import Generator from './Generator';
import { ALL_CSS } from 'constants/css';

const TWO = 2;
const pathname = '/generator';
const content = [
  {
    name: 'test',
    value: {
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
    }
  }
];

describe('Generator', () => {
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

  it('handle onChange for Hover and Active states', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);
    const shownCSS = 'filter: blur(5px) ;';

    const hoverSwitch = screen.getByText('Hover');
    const filterAccordion = screen.getByText('Filter');
    const activeSwitch = screen.getByText('Active');
    fireEvent.click(filterAccordion);

    fireEvent.click(hoverSwitch);
    const blurField = screen.getByLabelText('blur text field');
    fireEvent.change(blurField, { target: { value: '5' } });
    expect(screen.getByText(shownCSS)).toBeInTheDocument();

    fireEvent.click(activeSwitch);
    fireEvent.change(blurField, { target: { value: '5' } });
    expect(screen.getAllByText(shownCSS)).toHaveLength(TWO);
  });

  it('handle Load', async () => {
    jest.mock('api');
    const mockGet = jest.fn();
    api.get = mockGet.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    reduxTestWrapper(Generator, {}, {}, pathname);

    expect(screen.queryByText('background-color: rgba(255,138,138);')).not.toBeInTheDocument();

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);
    const dropdownBtn = screen.getByText('Select an existing record');
    fireEvent.click(dropdownBtn);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('test');
    fireEvent.click(testBtn);

    expect(screen.getByText('background-color: rgba(255,138,138);')).toBeInTheDocument();
  });

  it('handle Delete', async () => {
    jest.mock('api');
    const mockPost = jest.fn();
    const mockGet = jest.fn();
    mockPost.mockResolvedValue({
      data: {
        message: 'successful'
      }
    });
    api.post = mockPost;
    api.get = mockGet.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    reduxTestWrapper(Generator, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);
    const dropdownBtn = screen.getByText('Select an existing record');
    fireEvent.click(dropdownBtn);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('test');
    fireEvent.click(testBtn);

    const deleteBtn = screen.getByText('Delete');
    fireEvent.click(deleteBtn);

    expect(api.post).toHaveBeenCalledWith('/db', { filename: 'generator.json', content: JSON.stringify([]) });
  });

  it('handle Save', async () => {
    jest.mock('api');
    const mockPost = jest.fn();
    const mockGet = jest.fn();
    mockPost.mockResolvedValue({
      data: {
        message: 'successful'
      }
    });
    api.post = mockPost;
    api.get = mockGet.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    reduxTestWrapper(Generator, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);
    const dropdownBtn = screen.getByText('Select an existing record');
    fireEvent.click(dropdownBtn);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('test');
    fireEvent.click(testBtn);

    const saveBtn = screen.getByText('Save');
    fireEvent.click(saveBtn);

    const result = [
      {
        name: 'test',
        value: {
          parentBackgroundColor: '#ffffff',
          normalStyle: {
            height: '50',
            width: '100',
            borderColor: '#000000',
            borderStyle: 'solid',
            borderThickness: '1'
          },
          hoverStyle: {
            backgroundColor: '#ff8a8a'
          },
          activeStyle: {
            blur: '5'
          }
        }
      }
    ];

    expect(api.post).toHaveBeenCalledWith('/db', { filename: 'generator.json', content: JSON.stringify(result) });
  });
});

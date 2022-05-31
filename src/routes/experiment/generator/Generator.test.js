import api from 'api';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockLocalStorage } from 'testHelper';
import Generator from './Generator';
import { ALL_CSS } from 'constants/css';

const ZERO = 0;
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
      backgroundStyle: {
        backgroundColor: '#ffffff'
      }
    }
  }
];

describe('Generator', () => {
  it('handleMode change', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    expect(screen.queryByLabelText('Normal mode is on')).toBeInTheDocument();

    const hoverSwitch = screen.getByText('Hover');
    fireEvent.click(hoverSwitch);
    expect(screen.queryByLabelText('Hover mode is on')).toBeInTheDocument();

    const activeSwitch = screen.getByText('Active');
    fireEvent.click(activeSwitch);
    expect(screen.getByLabelText('Active mode is on')).toBeInTheDocument();
  });

  it('handle background mode change', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    expect(screen.queryByLabelText('Background Image')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Use Image'));
    expect(screen.queryByLabelText('Background Image')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Use Color'));
    expect(screen.queryByLabelText('Background Image')).not.toBeInTheDocument();
  });

  it('handleParentBackgroundColorChange change', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    const parentColorField = screen.getByLabelText('Parent Background Color color field has value #ffffff');
    fireEvent.change(parentColorField, { target: { value: '#000000' } });

    expect(screen.getByLabelText('Parent Background Color color field has value #000000')).toBeInTheDocument();
  });

  it('handle onMouseOver & onMouseDown then onMouseOut & onMouseUp', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    const testArea = screen.getByText('Test Area');
    fireEvent.mouseOver(testArea);
    fireEvent.mouseDown(testArea);

    expect(screen.queryByLabelText('isHovering and isActive effect is on')).toBeInTheDocument();

    fireEvent.mouseOut(testArea);
    fireEvent.mouseUp(testArea);

    expect(screen.queryByLabelText('normal effect is on')).toBeInTheDocument();
  });

  it('handle onChange for Hover and Active states', () => {
    reduxTestWrapper(Generator, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelBtn);

    const shownCSS = 'filter: blur(5px) ;';

    const hoverSwitch = screen.getByText('Hover');
    const activeSwitch = screen.getByText('Active');

    fireEvent.click(screen.getByText('Filter'));
    fireEvent.click(hoverSwitch);
    const blurField = screen.getByLabelText('Blur range field');
    fireEvent.change(blurField, { target: { value: '5' } });
    expect(screen.queryByText(shownCSS)).toBeInTheDocument();

    fireEvent.click(activeSwitch);
    fireEvent.change(blurField, { target: { value: '5' } });
    expect(screen.queryAllByText(shownCSS)).toHaveLength(TWO);
  });

  it('handle copy', () => {
    document.execCommand = jest.fn();
    reduxTestWrapper(Generator, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelBtn);

    const copyBtn = screen.getByLabelText('copy');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    fireEvent.click(copyBtn);
    const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];

    expect(copyEl.value).toEqual(
      '.name {\nheight: 50px;\nwidth: 100px;\nborder: 1px solid #000000;\n}\n\n.name:hover {\n\n}\n\n.name:active {\n\n}'
    );
    expect(document.execCommand).toHaveBeenCalledWith('copy');
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

    const sidePanelBtn = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelBtn);
    const dropdownBtn = screen.getByText('Select an existing record');
    fireEvent.click(dropdownBtn);

    await waitFor(() => {
      expect(screen.queryByText('test')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('test');
    fireEvent.click(testBtn);

    expect(screen.queryByText('background-color: rgba(255,138,138);')).toBeInTheDocument();
  });

  it.skip('handle Delete', async () => {
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

    const sidePanelBtn = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelBtn);
    const dropdownBtn = screen.getByText('Select an existing record');
    fireEvent.click(dropdownBtn);

    await waitFor(() => {
      expect(screen.queryByText('test')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('test');
    fireEvent.click(testBtn);

    const deleteBtn = screen.getByLabelText('trash');
    fireEvent.click(deleteBtn);

    expect(api.post).toHaveBeenCalledWith('/db', { filename: 'generator.json', content: JSON.stringify([]) });
  });

  it.skip('handle Save', async () => {
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

    const sidePanelBtn = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelBtn);
    const dropdownBtn = screen.getByText('Select an existing record');
    fireEvent.click(dropdownBtn);

    await waitFor(() => {
      expect(screen.queryByText('test')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('test');
    fireEvent.click(testBtn);

    const saveBtn = screen.getByLabelText('save');
    fireEvent.click(saveBtn);

    const result = [
      {
        name: 'test',
        value: {
          backgroundStyle: {
            backgroundColor: '#ffffff'
          },
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

  it.skip('handle change name', async () => {
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

    const sidePanelBtn = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelBtn);
    const nameField = screen.getByLabelText('Name text field');
    fireEvent.change(nameField, { target: { value: 'test' } });

    const saveBtn = screen.getByLabelText('save');
    fireEvent.click(saveBtn);

    const result = [
      {
        name: 'test',
        value: {
          backgroundStyle: {
            backgroundColor: '#ffffff'
          },
          normalStyle: {
            height: '50',
            width: '100',
            borderColor: '#000000',
            borderStyle: 'solid',
            borderThickness: '1'
          },
          hoverStyle: {},
          activeStyle: {}
        }
      }
    ];

    expect(api.post).toHaveBeenCalledWith('/db', { filename: 'generator.json', content: JSON.stringify(result) });
  });
});

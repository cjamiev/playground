import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { fullTestWrapper, reduxTestWrapper, mockApi } from 'testHelper';
import Project from './Project';
import api from 'api';
import { ROUTES } from 'constants/routes';
import { TIME } from 'constants/time';

const branches = ['branch1', 'branch2'];
const stashes = ['stash{1}', 'stash{2}'];
const packageJson = {
  'name': 'test-name',
  'description': 'test-description',
  'scripts': {
    'test-script': 'test-script',
    'test-script2': 'test-script2'
  },
  'devDependencies': {
    'test-dev-dep': '1.0.0',
    'test-dev-dep2': '2.0.0'
  },
  'dependencies': {
    'test-dep': '3.0.0',
    'test-dep2': '4.0.0'
  }
};
const versions = {
  'devDependencies': {
    'test-dev-dep': '1.0.1',
    'test-dev-dep2': '2.0.1'
  },
  'dependencies': {
    'test-dep': '3.0.1',
    'test-dep2': '4.0.0'
  }
};
const incorrectDirData = 'The system cannot find the path specified.';

const mockGet = (url) => {
  if(url === '/project/?type=package&op=read&root=./') {
    return Promise.resolve({
      data: {
        data: packageJson
      }
    });
  } else if(url === '/project/?type=package&op=getversions&root=./') {
    return Promise.resolve({
      data: {
        data: versions
      }
    });
  } else if (url === '/project/?type=git&op=remoteurl&root=./') {
    return Promise.resolve({
      data: {
        data: 'test-url'
      }
    });
  } else if (url === '/project/?type=git&op=viewbranches&root=./') {
    return Promise.resolve({
      data: {
        data: 'branch1\nbranch2\n'
      }
    });
  } else if (url === '/project/?type=git&op=viewstash&root=./') {
    return Promise.resolve({
      data: {
        data: 'stash@{1}: On master: stash1\nstash@{2}: On master: stash2\n'
      }
    });
  } else if (url.includes('testdir')) {
    return Promise.resolve({
      data: {
        data: incorrectDirData
      }
    });
  } else {
    return Promise.resolve({
      data: {
        message: 'test message'
      }
    });
  }
};
const mockPost = () => { return Promise.resolve({});};
const apiMock = mockApi(mockGet, mockPost);

const ZERO = 0;
const ONE = 1;
const rootDir = './';
const name = 'test-stash';
const defaultStoreProps = {
  project: {
    remoteUrl: 'test-url',
    branches,
    stashes,
    packageJson,
    versions,
    message: ''
  }
};

describe('Project', () => {
  describe('Git', () => {
    it('should handle remote url', () => {
      document.execCommand = jest.fn();
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const copyBtn = screen.getByLabelText('copy');
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      fireEvent.click(copyBtn);
      const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];

      expect(screen.queryByText(`Remote Url: ${defaultStoreProps.project.remoteUrl}`)).toBeInTheDocument();
      expect(copyEl.value).toEqual(defaultStoreProps.project.remoteUrl);
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('switch branch', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const branchesBtn = screen.getByText('Branches');
      fireEvent.click(branchesBtn);
      fireEvent.click(screen.getByText('branch1'));
      fireEvent.click(screen.getByText('Checkout branch1'));

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectbranch&root=${rootDir}&name=branch1`);
    });

    it('delete branch', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const branchesBtn = screen.getByText('Branches');
      fireEvent.click(branchesBtn);
      fireEvent.click(screen.getByText('branch1'));
      fireEvent.click(screen.getByText('Delete branch1'));

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletebranch&root=${rootDir}&name=branch1`);
    });

    it('merge branch', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const nameField = screen.getByLabelText('Name text field');

      fireEvent.change(nameField, { target: { value: name } });
      fireEvent.click(screen.getByText(`Merge ${name}`));

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=mergebranch&root=${rootDir}&name=${name}`);
    });

    it('create branch', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const nameField = screen.getByLabelText('Name text field');

      fireEvent.change(nameField, { target: { value: name } });
      fireEvent.click(screen.getByText(`Create ${name}`));

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createbranch&root=${rootDir}&name=${name}`);
    });

    it('handle create stash', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const nameField = screen.getByLabelText('Name text field');

      fireEvent.change(nameField, { target: { value: name } });
      const createStashBtn = screen.getByText(`Create Stash ${name}`);
      fireEvent.click(createStashBtn);

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createstash&root=${rootDir}&name=${name}`);
    });

    it('handle delete stash', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const nameField = screen.getByLabelText('Name text field');

      fireEvent.change(nameField, { target: { value: name } });
      const deleteStashBtn = screen.getByText(`Delete Stash ${name}`);
      fireEvent.click(deleteStashBtn);

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletestash&root=${rootDir}&name=${name}`);
    });

    it('select stash', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const stashesBtn = screen.getByText('Stashes');
      fireEvent.click(stashesBtn);
      fireEvent.click(screen.getByText('stash{1}'));
      fireEvent.click(screen.getByText('Switch Stash 1'));

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectstash&root=${rootDir}&name=1`);
    });

    it('handle reset', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const resetBtn = screen.getByText('Reset');
      fireEvent.click(resetBtn);

      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=resetbranch&root=${rootDir}`);
    });
  });

  describe('Package', () => {
    it('should render package deps', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const packageTab = screen.getByText('Package');
      fireEvent.click(packageTab);

      Object.keys(packageJson.devDependencies).forEach(depName => {
        expect(screen.queryByText(depName)).toBeInTheDocument();
        expect(screen.queryByText(packageJson.devDependencies[depName])).toBeInTheDocument();
      });
      Object.keys(packageJson.dependencies).forEach(depName => {
        expect(screen.queryByText(depName)).toBeInTheDocument();
        expect(screen.queryByText(packageJson.dependencies[depName])).toBeInTheDocument();
      });
    });

    it('handle load versions and update versions', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const packageTab = screen.getByText('Package');
      fireEvent.click(packageTab);

      const versionBtn = screen.getByText('Load Versions');
      const updateBtn = screen.getByText('Update Versions');
      fireEvent.click(versionBtn);

      Object.keys(versions.devDependencies).forEach(depName => {
        expect(screen.queryByText(depName)).toBeInTheDocument();
        expect(screen.queryByText(versions.devDependencies[depName])).toBeInTheDocument();
      });
      Object.keys(versions.dependencies).forEach(depName => {
        expect(screen.queryByText(depName)).toBeInTheDocument();
        expect(screen.queryByText(versions.dependencies[depName])).toBeInTheDocument();
      });

      expect(apiMock.get).toHaveBeenCalledWith('/project/?type=package&op=getversions&root=./');

      // Select and deselect test-dev-dep 1.0.1 and select test-dep 3.0.1
      fireEvent.click(screen.getByText('1.0.1'));
      fireEvent.click(screen.getByText('3.0.1'));
      fireEvent.click(screen.getByText('1.0.1'));
      fireEvent.click(updateBtn);

      expect(apiMock.post).toHaveBeenCalledWith('/project/?type=package&op=update&root=./', JSON.stringify({
        ...packageJson,
        dependencies: {
          'test-dep': '3.0.1',
          'test-dep2': '4.0.0'
        }
      }));
    });

    it('handle install', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const packageTab = screen.getByText('Package');
      fireEvent.click(packageTab);

      const installBtn = screen.getByText('install');
      fireEvent.click(installBtn);

      expect(apiMock.get).toHaveBeenCalledWith('/project/?type=package&op=runscript&root=./&content=install');
    });

    it('handle script and modal message', async () => {
      fullTestWrapper(Project, {}, defaultStoreProps, ROUTES.PROJECT.url);

      const packageTab = screen.getByText('Package');
      fireEvent.click(packageTab);

      const scriptBtn = screen.getByText('test-script');
      fireEvent.click(scriptBtn);

      expect(apiMock.get).toHaveBeenCalledWith('/project/?type=package&op=runscript&root=./&content=test-script');

      await waitFor(() => {
        expect(screen.queryByText('test message')).toBeInTheDocument();
        fireEvent.click(screen.getByLabelText('Close button'));
      });

      expect(screen.queryByText('test message')).not.toBeInTheDocument();
    });
  });

  describe('Regex', () => {
    it('Run updated on files with regex', () => {
      reduxTestWrapper(Project, {}, defaultStoreProps);

      const packageTab = screen.getByText('Regex');
      fireEvent.click(packageTab);

      const fileRegexField = screen.getByLabelText('File Regex text field');
      const lineRegexField = screen.getByLabelText('Line Regex text field');
      const replaceField = screen.getByLabelText('Replace text field');
      const substringStartField = screen.getByLabelText('Substring number range start');
      const substringEndField = screen.getByLabelText('Substring number range end');
      const globalModifierOption = screen.getByText('Global');
      const submitBtn = screen.getByText('Submit');

      fireEvent.change(fileRegexField, { target: { value: 'Icon.js$' } });
      fireEvent.change(lineRegexField, { target: { value: '[.][0-9]{2,}' } });
      fireEvent.change(replaceField, { target: { value: '123' } });
      fireEvent.change(substringStartField, { target: { value: '0' } });
      fireEvent.change(substringEndField, { target: { value: '3' } });
      fireEvent.click(globalModifierOption);
      fireEvent.click(submitBtn);

      expect(api.post).toHaveBeenCalledWith(`/project/?type=regex&root=${rootDir}`, JSON.stringify({
        fileRegex: 'Icon.js$',
        lineRegex: '[.][0-9]{2,}',
        modifiers: 'g',
        lineRange: {
          start: '0',
          end: '3'
        },
        replace: '123'
      }));
    });
  });

  it('updating root dir', async () => {
    jest.useFakeTimers();
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const rootField = screen.getByLabelText('Root text field');

    fireEvent.change(rootField, { target: { value: 'testdir' } });
    act(() => jest.advanceTimersByTime(TIME.A_SECOND));

    await waitFor(() => {
      expect(screen.getByText(`Remote Url: ${incorrectDirData}`)).toBeInTheDocument();
    });

    fireEvent.change(rootField, { target: { value: './' } });
    act(() => jest.advanceTimersByTime(TIME.A_SECOND));

    await waitFor(() => {
      expect(screen.getByText('Remote Url: test-url')).toBeInTheDocument();
    });
  });
});

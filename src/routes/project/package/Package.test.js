import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { fullTestWrapper, reduxTestWrapper, mockApi } from 'testHelper';
import Project from '../Project';
import api from 'api';
import { ROUTES } from 'constants/routes';
import { TIME } from 'constants/time';

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
const projectDb = {
  directories: [
    './',
    'C:/doc'
  ],
  regexes: [
    {
      description: 'reduce svg icon numbers to three decimals',
      fileRegex: 'Icon.js$',
      lineRegex: '[.][0-9]{2,}',
      modifiers: 'g',
      lineRange: {
        start: 0,
        end: 3
      },
      replace: ''
    }
  ]
};
const incorrectDirData = 'The system cannot find the path specified.';

const mockGet = (url) => {
  if(url === '/db/?name=project.json') {
    return Promise.resolve({
      data: {
        data: JSON.stringify(projectDb)
      }
    });
  } else if(url === '/project/?type=package&op=read&root=./') {
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
    directories: [],
    regexes: [],
    remoteUrl: 'test-url',
    branches: [],
    stashes: [],
    packageJson,
    versions,
    message: ''
  }
};

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

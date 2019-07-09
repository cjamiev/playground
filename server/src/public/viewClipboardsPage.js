const viewValue = item => {
  return () => {
    document.getElementById('view-value-details').innerHTML = JSON.stringify(item, undefined, 2);
  };
};

const executeCommand = command => {
  return () => {
    fetch('/execute-command', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ command }),
      method: 'POST'
    })
      .then(resp => resp.json())
      .then(result => {
        document.getElementById('view-clipboards-message').innerHTML = JSON.stringify(result);
      });
  };
};

const createCopyRow = ({ name, value }) => {
  const tr = document.createElement('tr');
  const nameCell = document.createElement('td');
  const valueCell = document.createElement('td');

  nameCell.innerHTML = name || 'none';
  const viewObjectButton = document.createElement('button');
  viewObjectButton.innerHTML = 'Copy';
  viewObjectButton.onclick = copyToClipboard(value);
  valueCell.appendChild(viewObjectButton);

  tr.appendChild(nameCell);
  tr.appendChild(valueCell);
  return tr;
};

const createUrlsRow = ({ name, value }) => {
  const tr = document.createElement('tr');
  const entryCell = document.createElement('td');

  const methodLink = document.createElement('a');
  const linkText = document.createTextNode(name);
  methodLink.href = value;
  methodLink.target = '_blank';
  methodLink.appendChild(linkText);
  entryCell.appendChild(methodLink);

  tr.appendChild(entryCell);
  return tr;
};

const createCommandsRow = ({ name, value }) => {
  const tr = document.createElement('tr');
  const entryCell = document.createElement('td');

  const viewObjectButton = document.createElement('button');
  viewObjectButton.innerHTML = name;
  viewObjectButton.onclick = executeCommand(value);
  entryCell.appendChild(viewObjectButton);

  tr.appendChild(entryCell);
  return tr;
};

const setCopyTableHTML = (data) => {
  const tableBody = document.getElementById('view-copy-body');

  data.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });

  data.forEach((entry) => {
    const newRow = createCopyRow(entry);
    tableBody.appendChild(newRow);
  });
};

const setUrlsTableHTML = (data) => {
  const tableBody = document.getElementById('view-urls-body');

  data.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });

  data.forEach((entry) => {
    const newRow = createUrlsRow(entry);
    tableBody.appendChild(newRow);
  });
};

const setCommandsTableHTML = (data) => {
  const tableBody = document.getElementById('view-commands-body');

  data.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });

  data.forEach((entry) => {
    const newRow = createCommandsRow(entry);
    tableBody.appendChild(newRow);
  });
};

const filterTableBySearch = (clip, type) => {
  const searchCriteria = document.getElementById(`view-${type}-filter`).value;
  const filtered = clip.filter(entry => entry.name.includes(searchCriteria));

  deleteAllChildren(document.getElementById(`view-${type}-body`));
  return filtered;
};

const filterCopyBySearch = () => {
  const copy = JSON.parse(sessionStorage.getItem('clipboards')).copy;

  filtered = filterTableBySearch(copy, 'copy');

  setCopyTableHTML(filtered);
};

const filterUrlsBySearch = () => {
  const urls = JSON.parse(sessionStorage.getItem('clipboards')).urls;

  filtered = filterTableBySearch(urls, 'urls');

  setUrlsTableHTML(filtered);
};

const filterCommandsBySearch = () => {
  const commands = JSON.parse(sessionStorage.getItem('clipboards')).commands;

  filtered = filterTableBySearch(commands, 'commands');

  setCommandsTableHTML(filtered);
};

const loadClipboards = () => {
  fetch('/clipboards')
    .then(resp => resp.json())
    .then(clipboards => {
      sessionStorage.setItem('clipboards', JSON.stringify(clipboards));
      setCopyTableHTML(clipboards.copy);
      setUrlsTableHTML(clipboards.urls);
      setCommandsTableHTML(clipboards.commands);
    });
};

loadClipboards();
const NAME_ERROR = 'Name is required';
const VALUE_ERROR = 'Value is required';

const createNewClipboardEntry = () => {
  const type = getSelectDropdownValue('view-clipboards-type');
  const name = document.getElementById('view-clipboards-name').value;
  const value = document.getElementById('view-clipboards-value').value;

  const payload = {
    type,
    name,
    value
  };

  const nameError = !name ? NAME_ERROR : '';
  const valueError = !type ? VALUE_ERROR : '';

  if (nameError || typeError) {
    document.getElementById('view-clipboards-message').innerHTML = 'ERRORS:' + nameError + ' ' + valueError;
  } else {
    fetch('/createNewClipboardEntry', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      method: 'POST'
    })
      .then(resp => resp.json())
      .then(data => {
        document.getElementById('view-clipboards-message').innerHTML = data.message;
      })
      .catch(err => {
        document.getElementById('view-clipboards-message').innerHTML = err.message;
      });
  }
};
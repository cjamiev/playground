const handleCheckboxChange = (id, payloadId) => {
  return ({ target: { value } }) => {
    const currentPayload = JSON.parse(sessionStorage.getItem(payloadId));
    if(currentPayload){
      const selected = currentPayload[id];
      const shouldRemoveOrAdd = selected.find(item => item === value);
      const updatedSelection = shouldRemoveOrAdd ?
        selected.filter(item => item !== value) :
        selected.concat([value]);

      const updatedPayload = {
        ...currentPayload,
        [id]: updatedSelection
      };
      sessionStorage.setItem(payloadId, JSON.stringify(updatedPayload));
    } else {
      sessionStorage.setItem(payloadId, JSON.stringify({[id]: [value]}));
    }

  };
};

const createCheckbox = ({id, label, values}, payloadId) => {
  const payload = JSON.parse(sessionStorage.getItem(payloadId));
  const selected = payload[id];

  const checkboxes = values.map(value => {
    const checkbox = document.createElement('div');
    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerHTML = value;
    checkboxLabel.htmlFor = `${label}-${value}`;
    const checkboxInput = document.createElement('input');

    checkboxInput.id = `${label}-${value}`;
    checkboxInput.type = 'checkbox';
    checkboxInput.name = label;
    checkboxInput.value = value;
    if(selected.find(item => item === value)){
      checkboxInput.checked = true;
    }
    checkboxInput.onchange = handleCheckboxChange(id, payloadId);
  
    checkbox.appendChild(checkboxInput);
    checkbox.appendChild(checkboxLabel);

    return checkbox;
  })

  const checkboxGroup = document.createElement('div');
  const checkboxGroupLabel = document.createElement('label');
  checkboxGroupLabel.innerHTML = label;
  checkboxGroupLabel.className = 'form-label';

  checkboxGroup.appendChild(checkboxGroupLabel);
  checkboxes.forEach(checkbox => {
    checkboxGroup.appendChild(checkbox);
  });

  return checkboxGroup;
};
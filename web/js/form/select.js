const handleSelectChange = (id, payloadId) => {
  return ({ target: { value } }) => {
    const currentPayload = JSON.parse(sessionStorage.getItem(payloadId));
    if(currentPayload){
      const updatedPayload = {
        ...currentPayload,
        [id]: value
      };
      sessionStorage.setItem(payloadId, JSON.stringify(updatedPayload));
    } else {
      sessionStorage.setItem(payloadId, JSON.stringify({[id]: [value]}));
    }

  };
};

const createSelect = ({id, label, values}, payloadId) => {
  const payload = JSON.parse(sessionStorage.getItem(payloadId));
  const selected = payload[id];

  const options = values.map(value => {
    const option = document.createElement('option');
    option.value = value;
    option.innerHTML = value;
    if(selected === value){
      option.selected = selected;
    }

    return option;
  })

  const selectDiv = document.createElement('div');
  const select = document.createElement('select');
  select.onchange = handleSelectChange(id, payloadId);
  const selectLabel = document.createElement('label');
  selectLabel.innerHTML = label;
  selectLabel.className = 'form-label';

  options.forEach(option => {
    select.appendChild(option);
  });
  selectDiv.appendChild(selectLabel);
  selectDiv.appendChild(select);

  return selectDiv;
};
const handleDateChange = (id, payloadId) => {
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

const createDate = ({id, label}, payloadId) => {
  const payload = JSON.parse(sessionStorage.getItem(payloadId));
  const selected = payload[id];

  const dateDiv = document.createElement('div');
  const dateLabel = document.createElement('label');
  dateLabel.innerHTML = label;
  dateLabel.className = 'form-label';
  const dateInput = document.createElement('input');
  dateInput.id = `${label}`;
  dateInput.type = 'date';
  dateInput.name = label;
  dateInput.value = selected||'';
  dateInput.onchange = handleDateChange(id, payloadId);

  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(dateInput);

  return dateDiv;
};
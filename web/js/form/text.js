const handleTextChange = (id, payloadId) => {
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

const createText = ({id, label}, payloadId) => {
  const payload = JSON.parse(sessionStorage.getItem(payloadId));
  const selected = payload[id];

  const textDiv = document.createElement('div');
  const textLabel = document.createElement('label');
  textLabel.innerHTML = label;
  textLabel.className = 'form-label';
  const textInput = document.createElement('input');
  textInput.id = `${label}`;
  textInput.type = 'text';
  textInput.name = label;
  textInput.value = selected||'';
  textInput.onchange = handleTextChange(id, payloadId);

  textDiv.appendChild(textLabel);
  textDiv.appendChild(textInput);

  return textDiv;
};
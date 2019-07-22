const handleRadioChange = (id, payloadId) => {
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

const createRadio = ({id, label, values}, payloadId) => {
  const payload = JSON.parse(sessionStorage.getItem(payloadId));
  const selected = payload[id];

  const radios = values.map(value => {
    const radio = document.createElement('div');
    const radioLabel = document.createElement('label');
    radioLabel.innerHTML = value;
    radioLabel.htmlFor = `${label}-${value}`;
    const radioInput = document.createElement('input');

    radioInput.id = `${label}-${value}`;
    radioInput.type = 'radio';
    radioInput.name = label;
    radioInput.value = value;
    if(selected === value){
      radioInput.checked = true
    }
    radioInput.onchange = handleRadioChange(id, payloadId);
  
    radio.appendChild(radioInput);
    radio.appendChild(radioLabel);

    return radio;
  })

  const radioGroup = document.createElement('div');
  const radioGroupLabel = document.createElement('label');
  radioGroupLabel.className = 'form-label';
  radioGroupLabel.innerHTML = label;

  radioGroup.appendChild(radioGroupLabel);
  radios.forEach(radio => {
    radioGroup.appendChild(radio);
  });

  return radioGroup;
};
const newTable = createTable(
  ['col1', 'col2'], 
  [
    [
      {
        type: 'text',
        innerHTML: 'cell11'
      },
      {
        type: 'button',
        innerHTML: 'cell12',
        onclick: () => { console.log('clicked cell12')}
      }
    ],
    [
      {
        type: 'text',
        innerHTML: 'cell21'
      },
      {
        type: 'button',
        innerHTML: 'cell22',
        onclick: () => { console.log('clicked cell22')}
      }
    ]
  ]
)

const testTable = document.getElementById('test-table');
testTable.appendChild(newTable);

// Modal Test
const testModalOne = createModal('testModal1', 'testing the new modal');
const testModalTwo = createModal('testModal2', 'testing modal 2');

const modalComponentOne = testModalOne.modalComponent();
const modalComponentTwo = testModalTwo.modalComponent();
const modalH2 = document.createElement('h2');
const modalOneButton = document.createElement('button');
const modalTwoButton = document.createElement('button');

modalH2.innerHTML = 'Modal Example';
modalOneButton.onclick = testModalOne.openModal;
modalOneButton.innerHTML = 'Open Modal One';
modalTwoButton.onclick = testModalTwo.openModal;
modalTwoButton.innerHTML = 'Open Modal Two';

const testModal = document.getElementById('test-modal');
testModal.appendChild(modalH2);
testModal.appendChild(modalOneButton);
testModal.appendChild(modalTwoButton);
testModal.appendChild(modalComponentOne);
testModal.appendChild(modalComponentTwo);

window.onclick = (event) => {
  closeAllModals(event);
}

// Accordion Test
const accH2 = document.createElement('h2');
const acc1 = createAccordion('acc1','Accordion 1', 'Test accordion 1');
const acc2 = createAccordion('acc2','Accordion 2', 'Test accordion 2');
const acc3 = createAccordion('acc3','Accordion 3', 'Test accordion 3');

accH2.innerHTML = 'Accordions';

const accordionDiv = document.getElementById('test-accordion');
accordionDiv.appendChild(accH2);
accordionDiv.appendChild(acc1);
accordionDiv.appendChild(acc2);
accordionDiv.appendChild(acc3);
handleAccordions();

// Alerts Test
const alert1 = createAlert('alert1', 'error', 'Indicates a dangerous or potentially negative action.');
const alert2 = createAlert('alert2', 'success', 'Indicates a successful or positive action.');
const alert3 = createAlert('alert3', 'info', 'Indicates a neutral informative change or action.');
const alert4 = createAlert('alert4', 'warning', 'Indicates a warning that might need attention.');

const alertTest = document.getElementById('test-alert');
const alertH2 = document.createElement('h2');
alertH2.innerHTML = 'Alerts';

alertTest.appendChild(alertH2);
alertTest.appendChild(alert1);
alertTest.appendChild(alert2);
alertTest.appendChild(alert3);
alertTest.appendChild(alert4);

// Form Test
const selectData = {
  id: 1,
  type: 'select',
  label: 'Select1',
  values: ['value1', 'value2'],
};
const checkboxData = {
  id: 2,
  type: 'checkbox',
  label: 'checkbox1',
  values: ['ckvalue1', 'ckvalue2']
};
const radioData = {
  id: 3,
  type: 'radio',
  label: 'radio1',
  values: ['rvalue1', 'rvalue2']
};
const textData = {
  id: 4,
  type: 'text',
  label: 'Text1',
  regex: '[0-9]+',
  errorMessage: 'Please enter a valid number',
  orderSeq: 4
}
const dateData = {
  id: 5,
  type: 'date',
  label: 'Date1',
  orderSeq: 5
}

const checkboxComponent = createCheckbox(checkboxData, 'test-payload');
const radioComponent = createRadio(radioData, 'test-payload');
const selectComponent = createSelect(selectData, 'test-payload');
const textComponent = createText(textData, 'test-payload');
const dateComponent = createDate(dateData, 'test-payload');

const formTest = document.getElementById('form-test');

formTest.appendChild(checkboxComponent);
formTest.appendChild(radioComponent);
formTest.appendChild(selectComponent);
formTest.appendChild(textComponent);
formTest.appendChild(dateComponent);
const newTable = createTable(
  ['col1, col2'], 
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
  accordionDiv.appendChild(acc1.accordionComponent());
  accordionDiv.appendChild(acc2.accordionComponent());
  accordionDiv.appendChild(acc3.accordionComponent());
  handleAccordions();
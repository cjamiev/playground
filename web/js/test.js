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

const body = document.body;
body.appendChild(newTable);

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

body.appendChild(modalH2);
body.appendChild(modalOneButton);
body.appendChild(modalTwoButton);
body.appendChild(modalComponentOne);
body.appendChild(modalComponentTwo);

window.onclick = (event) => {
  closeAllModals(event);
}
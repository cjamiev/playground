const ZERO = 0;
const ONE = 1;
const TWO = 2;

context('Todo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/experiment');
  });

  it('Add To Do Item(s)', () => {
    cy.contains('Todo').click();
    cy.get('[data-testid="todo-in"]').type('item1').should('have.value', 'item1');
    cy.contains('Add Item').click();
    cy.get('[data-testid="todo-in"]').type('item2').should('have.value', 'item2');
    cy.contains('Add Item').click();
    cy.get('[data-testid="todo-in"]').type('item3').should('have.value', 'item3');
    cy.contains('Add Item').click();
    cy.get('[data-testid="todo-list"]').children().should('have.length', 3).each((item, index) => {
      if(index === ZERO) {
        cy.get(item).contains('item1');
      }
      else if(index === ONE) {
        cy.get(item).contains('item2');
      }
      else if(index === TWO) {
        cy.get(item).contains('item3');
      }
    });
    cy.get('[data-testid="item3"]').contains('Move Item Up').click();
    cy.get('[data-testid="item1"]').contains('Move Item Down').click();
    cy.get('[data-testid="todo-list"]').children().should('have.length', 3).each((item, index) => {
      if(index === ZERO) {
        cy.get(item).contains('item3');
      }
      else if(index === ONE) {
        cy.get(item).contains('item1');
      }
      else if(index === TWO) {
        cy.get(item).contains('item2');
      }
    });
    cy.get('[data-testid="item1"]').contains('Done').click();
    cy.get('[data-testid="todo-list"]').children().should('have.length', 2).each((item, index) => {
      if(index === ZERO) {
        cy.get(item).contains('item3');
      }
      else if(index === ONE) {
        cy.get(item).contains('item2');
      }
    });
  });
});

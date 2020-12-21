context('Todo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/todo');
  });

  it('Add To Do Item(s)', () => {
    cy.get('[data-testid="todo-in"]').type('item1').should('have.value', 'item1');
    cy.contains('Add Item').click();
    cy.get('[data-testid="todo-in"]').type('item2').should('have.value', 'item2');
    cy.contains('Add Item').click();
    cy.get('[data-testid="item2"]').contains('Move Item Up').click();
  });
});

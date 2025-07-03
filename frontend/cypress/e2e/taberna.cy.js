describe('Comprobación de la página Home', () => {
  it('Debe mostrar el párrafo con la pregunta "¿Quién eres?"', () => {
    cy.visit('/');
    // cy.get('p').contains('¿Quién eres?');

    cy.get('[data-testid="p-hola"]').should('have.text','¿Quién eres?')
  });
});

describe('Visualización del menú en VistaCliente', () => {
  beforeEach(() => {
    cy.visit('/cliente'); // ruta donde está VistaCliente
  });

  it('Debe mostrar el título principal "La Taberna de Egia"', () => {
    cy.contains('h1', 'La Taberna de Egia').should('be.visible');
  });

  it('Debe mostrar la lista de comidas con sus opciones', () => {
    cy.get('select#comidas').should('exist');
    cy.get('select#comidas option').should('have.length.greaterThan', 1);
    cy.get('select#comidas option').contains('Ración de patatas').should('exist');
  });

  it('Debe mostrar la lista de bebidas con sus opciones', () => {
    cy.get('select#bebidas').should('exist');
    cy.get('select#bebidas option').should('have.length.greaterThan', 1);
    cy.get('select#bebidas option').contains('Jarra de cerveza 1L').should('exist');
  });
});

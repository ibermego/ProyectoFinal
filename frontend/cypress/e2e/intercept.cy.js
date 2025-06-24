describe('Envió y actualización del pedido', () => {
  beforeEach(() => {
    cy.visit('/cliente');
  });

  it('Hace POST con datos correctos y actualiza estado con la respuesta', () => {
    cy.intercept('POST', 'http://localhost:5000/api/v1/pedidos', (req) => {
      expect(req.body.mesa).to.equal('mesa1');
      expect(req.body.comida).to.equal('Ración de patatas');
      expect(req.body.bebida).to.equal('Jarra de cerveza 1L');
      expect(req.body.cantidadComida).to.equal(1);
      expect(req.body.cantidadBebida).to.equal(1);
      req.reply({ statusCode: 200, body: { message: 'Pedido recibido' } });
    }).as('postPedido');

    cy.get('#mesa').select('Mesa 1');
    cy.get('#comidas').select('1');      // ¡Importante!
    cy.get('#bebidas').select('1');      // ¡Importante!

    cy.get('button.enviar').click();

    cy.wait('@postPedido');

    cy.contains('p', 'Mesa: mesa1').should('exist');
    cy.contains('p', '1 × Ración de patatas').should('exist');
    cy.contains('p', '1 × Jarra de cerveza 1L').should('exist');
  });
});

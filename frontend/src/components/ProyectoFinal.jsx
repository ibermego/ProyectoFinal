import React from 'react';

function App() {
  return (
    <div className="container">
      <h1> La Taberna de Egia</h1>

      <div className="mesa">
        <label htmlFor="mesa">Selecciona tu mesa:</label>
        <select id="mesa">
          <option value="">-- Mesa --</option>
          <option value="1">Mesa 1</option>
          <option value="2">Mesa 2</option>
          <option value="3">Mesa 3</option>
          <option value="4">Mesa 4</option>
          <option value="5">Mesa 5</option>
          <option value="6">Mesa 6</option>
          <option value="7">Mesa 7</option>
          <option value="8">Mesa 8</option>
          <option value="9">Mesa 9</option>
          <option value="barra">Barra 3</option>
          <option value="barra">Barra 2</option>
          <option value="barra">Barra 1</option>
        </select>
      </div>

      <div className="menu">
        <h2> Comidas</h2>
      <select id= "comidas">
        <option value="">-- Comidas --</option>
        <option value="1">Racion de patatas</option>
        <option value="2">Hamburguesa</option>
        <option value="3">Filete de ternera</option>
        <option value="4">Codillo</option>
        <option value="5">Pollo asado</option>
      </select>

        <h2> Bebidas</h2>
        <select id= "bebidas">
        <option value="">-- Bebidas --</option>
        <option value="">Jarra de cerveza 1L</option>
        <option value="">Jarra de cerveza 1/2L</option>
        <option value="">Caña</option>
        <option value="">Calimocho 1L</option>
        <option value="">Calimocho 1/2L</option>
        <option value="">Botella de sidra</option>
        <option value="">Botella de vino</option>
      </select>
      </div>

      <div className="pedido">
        <h2> Tu pedido:</h2>
        <p>No has pedido nada todavía.</p>
        <p><strong>Total:</strong> 0.00€</p>
        <button className="enviar">Enviar pedido</button>
      </div>


    </div>
  );
}

export default App;

  

import React from 'react';
// import './App.css';

// COMIDAS
const comidas = [
  { id: 1, name: "Ración de patatas" },
  { id: 2, name: "Hamburguesa" },
  { id: 3, name: "Filete de ternera" },
  { id: 4, name: "Codillo" },
  { id: 5, name: "Pollo asado" },
];

// MESAS
const mesas = [
  "Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5",
  "Mesa 6", "Mesa 7", "Mesa 8", "Mesa 9",
  "Barra 1", "Barra 2", "Barra 3"
];
//BEBIDAS
const bebidas = [
  { id: 1, name: "Jarra de cerveza 1L" },
  { id: 2, name: "Jarra de cerveza 1/2L" },
  { id: 3, name: "Caña" },
  { id: 4, name: "Calimocho 1L" },
  { id: 5, name: "Calimocho 1/2L" },
  { id: 6, name: "Botella de sidra" },
  { id: 7, name: "Botella de vino" },
];

function App() {
  return (
    <div className="container">
      <h1>La Taberna de Egia</h1>

      <div className="mesa">
        <label htmlFor="mesa">Selecciona tu mesa:</label>
        <select id="mesa" defaultValue="">
          <option value="" disabled>-- Mesa --</option>
          {mesas.map((mesa, index) => (
            <option key={index} value={mesa.toLowerCase().replace(' ', '')}>
              {mesa}
            </option>
          ))}
        </select>
      </div>

      <div className="menu">
        <h2>Comidas</h2>
        <select id="comidas" defaultValue="">
          <option value="" disabled>-- Comidas --</option>
          {comidas.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <h2>Bebidas</h2>
        <select id="bebidas" defaultValue="">
          <option value="" disabled>-- Bebidas --</option>
          {bebidas.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pedido">
        <h2>Tu pedido:</h2>
        <p>No has pedido nada todavía.</p>
        <p><strong>Total:</strong> 0.00€</p>
        <button
          className="enviar"
          onClick={() => {
            const mesa = document.getElementById('mesa').value;
            const comida = document.getElementById('comidas').value;
            const bebida = document.getElementById('bebidas').value;

            fetch('http://localhost:5000/api/v1/pedidos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mesa,
                comida,
                bebida,
                timestamp: new Date().toISOString(),
              }),
            })
              .then(res => res.json())
              .then(data => {
                alert('Pedido enviado con éxito');
                console.log(data);
              })
              .catch(err => {
                alert('Error al enviar pedido');
                console.error(err);
              });
          }}
        >
          Enviar pedido
        </button>
      </div>
    </div>
  );
}

export default App;

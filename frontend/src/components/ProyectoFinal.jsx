import React, { useState } from 'react';
import './taberna.css';

function VistaCliente() {
  const [pedido, setPedido] = useState(null);

  const comidas = [
    { id: 1, name: "Ración de patatas", price: 4, icon: "🧈" },
    { id: 2, name: "Hamburguesa", price: 6.5, icon: "💪" },
    { id: 3, name: "Filete de ternera", price: 10, icon: "💪" },
    { id: 4, name: "Codillo", price: 12, icon: "💪" },
    { id: 5, name: "Pollo asado", price: 9, icon: "💪" },
  ];

  const bebidas = [
    { id: 1, name: "Jarra de cerveza 1L", price: 4, icon: "💪" },
    { id: 2, name: "Jarra de cerveza 1/2L", price: 2.5, icon: "💪" },
    { id: 3, name: "Caña", price: 1.8, icon: "💪" },
    { id: 4, name: "Calimocho 1L", price: 3.5, icon: "💪" },
    { id: 5, name: "Calimocho 1/2L", price: 2, icon: "💪" },
    { id: 6, name: "Botella de sidra", price: 3.2, icon: "💪" },
    { id: 7, name: "Botella de vino", price: 6, icon: "💪" },
  ];

  const mesas = [
    "Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5",
    "Mesa 6", "Mesa 7", "Mesa 8", "Mesa 9",
    "Barra 1", "Barra 2", "Barra 3"
  ];

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
        {/* <select id="comidas" defaultValue="">
          <option value="" disabled>-- Comidas --</option> */}
          {/* {comidas.map(c => (
            <option key={c.id} value={c.id}>{c.name} - {c.price.toFixed(2)}€</option>
          ))}
        </select>
        <label className="cantidad">Cantidad:</label>
        <input id="cantidad-comida" type="number" min="1" defaultValue="1" /> */}

        <h2>Bebidas</h2>
        {/* <select id="bebidas" defaultValue="">
          <option value="" disabled>-- Bebidas --</option>
          {bebidas.map(b => (
            <option key={b.id} value={b.id}>{b.name} - {b.price.toFixed(2)}€</option>
          ))}
        </select> */}
          {/* elboracion del map par ver pedido con emojis: */}
          {comidas.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.icon} {c.name} - {c.price.toFixed(2)}€
                      </option>
                    ))}

          {bebidas.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.icon} {b.name} - {b.price.toFixed(2)}€
                </option>
                    ))}


        <label className="cantidad">Cantidad:</label>
        <input id="cantidad-bebida" type="number" min="1" defaultValue="1" />
      </div>

      <div className="pedido">
        <h2>Tu pedido:</h2>

        {pedido ? (
          <>
            <p><strong>Mesa:</strong> {pedido.mesa}</p>
            <p><strong>Comida:</strong> {pedido.cantidadComida} × {pedido.comida} ({pedido.precioComida.toFixed(2)}€)</p>
            <p><strong>Bebida:</strong> {pedido.cantidadBebida} × {pedido.bebida} ({pedido.precioBebida.toFixed(2)}€)</p>
            <p><strong>Total:</strong> {pedido.total.toFixed(2)}€</p>
          </>
        ) : (
          <>
            <p>No has pedido nada todavía.</p>
            <p><strong>Total:</strong> 0.00€</p>
          </>
        )}

        <button
          className="enviar"
          onClick={() => {
            const mesa = document.getElementById('mesa').value;
            const comidaId = parseInt(document.getElementById('comidas').value);
            const bebidaId = parseInt(document.getElementById('bebidas').value);
            const cantidadComida = parseInt(document.getElementById('cantidad-comida').value);
            const cantidadBebida = parseInt(document.getElementById('cantidad-bebida').value);

            const comidaObj = comidas.find(c => c.id === comidaId);
            const bebidaObj = bebidas.find(b => b.id === bebidaId);

            const total = (comidaObj.price * cantidadComida) + (bebidaObj.price * cantidadBebida);

            fetch('http://localhost:5000/api/v1/pedidos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                mesa,
                comida: comidaObj.name,
                bebida: bebidaObj.name,
                cantidadComida,
                cantidadBebida,
                total,
                timestamp: new Date().toISOString(),
              }),
            })
              .then(res => res.json())
              .then(data => {
                alert('Pedido enviado con éxito');
                console.log(data);
                setPedido({
                  mesa,
                  comida: comidaObj.name,
                  bebida: bebidaObj.name,
                  cantidadComida,
                  cantidadBebida,
                  precioComida: comidaObj.price,
                  precioBebida: bebidaObj.price,
                  total,
                });
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

export default VistaCliente;

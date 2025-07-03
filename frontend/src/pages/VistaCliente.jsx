import React, { useState, useEffect } from 'react';
import './taberna.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://proyectofinal-backend3.onrender.comgit add .
";
// const API_BASE_URL = "http://localhost:5000"; // Descomenta esta línea para trabajar en localhost

function VistaCliente() {
  // Estado del pedido completo
  const [pedido, setPedido] = useState(null);

  // Estados para controlar selecciones y cantidades
  const [mesa, setMesa] = useState('');
  const [comidaId, setComidaId] = useState('');
  const [bebidaId, setBebidaId] = useState('');
  const [cantidadComida, setCantidadComida] = useState(1);
  const [cantidadBebida, setCantidadBebida] = useState(1);
  const [comentario, setComentario] = useState('');

  const comidas = [
    { id: 1, name: "Ración de patatas", price: 4, icon: "🥔" },
    { id: 2, name: "Hamburguesa", price: 6.5, icon: "🥩" },
    { id: 3, name: "Filete de ternera", price: 10, icon: "🥩" },
    { id: 4, name: "Codillo", price: 12, icon: "🥩" },
    { id: 5, name: "Pollo asado", price: 9, icon: "🍗" },
  ];

  const bebidas = [
    { id: 1, name: "Jarra de cerveza 1L", price: 4, icon: "🍺" },
    { id: 2, name: "Jarra de cerveza 1/2L", price: 2.5, icon: "🍺" },
    { id: 3, name: "Caña", price: 1.8, icon: "🍺" },
    { id: 4, name: "Calimocho 1L", price: 3.5, icon: "🍷🥤" },
    { id: 5, name: "Calimocho 1/2L", price: 2, icon: "🍷🥤" },
    { id: 6, name: "Botella de sidra", price: 3.2, icon: "🍏" },
    { id: 7, name: "Botella de vino", price: 6, icon: "🍷" },
  ];

  const mesas = [
    "Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5",
    "Mesa 6", "Mesa 7", "Mesa 8", "Mesa 9",
    "Barra 1", "Barra 2", "Barra 3"
  ];

  // Función para actualizar el pedido cuando cambie cualquier dato
  useEffect(() => {
    if (!mesa) {
      // Mesa es obligatoria
      setPedido(null);
      return;
    }

    // Buscamos objetos de comida y bebida, si no hay selección, serán undefined
    const comidaObj = comidaId ? comidas.find(c => c.id === parseInt(comidaId)) : null;
    const bebidaObj = bebidaId ? bebidas.find(b => b.id === parseInt(bebidaId)) : null;

    // Si se seleccionó comida o bebida pero no se encontró el objeto, invalidamos pedido
    if ((comidaId && !comidaObj) || (bebidaId && !bebidaObj)) {
      setPedido(null);
      return;
    }

    // Calculamos total solo con lo seleccionado
    const totalComida = comidaObj ? comidaObj.price * cantidadComida : 0;
    const totalBebida = bebidaObj ? bebidaObj.price * cantidadBebida : 0;
    const total = totalComida + totalBebida;

    setPedido({
      mesa,
      comida: comidaObj ? comidaObj.name : null,
      bebida: bebidaObj ? bebidaObj.name : null,
      cantidadComida: comidaObj ? cantidadComida : 0,
      cantidadBebida: bebidaObj ? cantidadBebida : 0,
      precioComida: comidaObj ? comidaObj.price : 0,
      precioBebida: bebidaObj ? bebidaObj.price : 0,
      total,
      comentario: comentario.trim(),
    });
  }, [mesa, comidaId, bebidaId, cantidadComida, cantidadBebida, comentario]);

  const enviarPedido = () => {
    if (!pedido) {
      alert("Por favor, selecciona al menos la mesa para enviar el pedido.");
      return;
    }

    fetch(`${API_BASE_URL}/api/v1/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...pedido,
        timestamp: new Date().toISOString(),
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error en el servidor');
        return res.json();
      })
      .then(() => {
        alert('Pedido enviado con éxito');
      })
      .catch(err => {
        alert('Error al enviar pedido');
        console.error(err);
      });
  };

  // Funciones para subir o bajar cantidad, mínimo 1
  const aumentarCantidadComida = () => setCantidadComida(c => c + 1);
  const disminuirCantidadComida = () => setCantidadComida(c => (c > 0 ? c - 1 : 0));

  const aumentarCantidadBebida = () => setCantidadBebida(c => c + 1);
  const disminuirCantidadBebida = () => setCantidadBebida(c => (c > 0 ? c - 1 : 0));

  return (
    <div className="container">
      <h1>La Taberna de Egia</h1>

      <a
        href="https://showy-taleggio-ba6.notion.site/Documentaci-n-Taberna-223e59e04eaf807fab77c7e05b102846"
        target="_blank"
        rel="noopener noreferrer"
      >
        📚 DOCUMENTACION TABERNA DE EGIA
      </a>
      <a
        href="https://inigos-app-7gwf.glide.page/dl/d0a5f4"
        target="_blank"
        rel="noopener noreferrer"
      >
        ⌚ HORARIOS TABERNA DE EGIA
      </a>

      <div className="mesa">
        <label htmlFor="mesa">Selecciona tu mesa:</label>
        <select id="mesa" value={mesa} onChange={e => setMesa(e.target.value)}>
          <option value="" disabled>-- Mesa --</option>
          {mesas.map((m, index) => (
            <option key={index} value={m.toLowerCase().replace(' ', '')}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="menu">
        <h2>Comidas</h2>
        <select id="comidas" value={comidaId} onChange={e => setComidaId(e.target.value)}>
          <option value="">-- Nada --</option>
          {comidas.map(c => (
         <option key={c.id} value={c.id}>
           {c.icon} {c.name} - {c.price.toFixed(2)}€
           </option>
             ))}
        </select>
        <label className="cantidad">Cantidad:</label>
        {/* <input id="cantidad-comida" type="number" min="1" defaultValue="1" /> */}
        <button type="button" onClick={disminuirCantidadComida}>-</button>
        <span style={{ margin: '0 10px' }}>{cantidadComida}</span>
        <button type="button" onClick={aumentarCantidadComida}>+</button>

        <h2>Bebidas</h2>
        <select id="bebidas" value={bebidaId} onChange={e => setBebidaId(e.target.value)}>
            <option value="">-- Nada --</option>
            {bebidas.map(b => (
              <option key={b.id} value={b.id}>
              {b.icon} {b.name} - {b.price.toFixed(2)}€
             </option>
         ))}
        </select>
        <label className="cantidad">Cantidad:</label>
        {/* <input id="cantidad-bebida" type="number" min="1" defaultValue="1" /> */}
        <button type="button" onClick={disminuirCantidadBebida}>-</button>
        <span style={{ margin: '0 10px' }}>{cantidadBebida}</span>
        <button type="button" onClick={aumentarCantidadBebida}>+</button>

        <label htmlFor="comentario">Comentario (opcional):</label>
        <textarea
          id="comentario"
          rows="3"
          placeholder="Comentarios, alergias, peticiones especiales..."
          value={comentario}
          onChange={e => setComentario(e.target.value)}
        ></textarea>
      </div>

      <div className="leyenda">
        <h3>🗺️ Leyenda de iconos</h3>
        <ul>
          <li>🥩 Carne</li>
          <li>🍗 Pollo</li>
          <li>🥔 Vegetariano</li>
          <li>🌱 Vegano (no disponible aún)</li>
          <li>🍺 Cerveza</li>
          <li>🍷 Vino</li>
          <li>🍷🥤 Calimocho</li>
          <li>🍏 Sidra</li>
        </ul>
      </div>

      <div className="pedido">
        <h2>Tu pedido:</h2>

        {pedido ? (
          <>
            <p><strong>Mesa:</strong> {pedido.mesa}</p>
            {pedido.comida && (
              <p><strong>Comida:</strong> {pedido.cantidadComida} × {pedido.comida} ({pedido.precioComida.toFixed(2)}€)</p>
            )}
            {pedido.bebida && (
              <p><strong>Bebida:</strong> {pedido.cantidadBebida} × {pedido.bebida} ({pedido.precioBebida.toFixed(2)}€)</p>
            )}
            <p><strong>Comentario:</strong> {pedido.comentario || 'Sin comentarios'}</p>
            <p><strong>Total:</strong> {pedido.total.toFixed(2)} €</p>
            <button onClick={enviarPedido}>Enviar pedido</button>
          </>
        ) : (
          <p>Selecciona al menos la mesa para ver tu pedido.</p>
        )}
      </div>
    </div>
  );
}

export default VistaCliente;

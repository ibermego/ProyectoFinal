import React, { useEffect, useState } from 'react';
const API_BASE_URL = "https://backend.onrender.com/api/v1";

function VistaCamarero() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const [editPedido, setEditPedido] = useState(null);

  const cargarPedidos = () => {
    fetch('http://localhost:5000/api/v1/pedidos')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar pedidos');
        return res.json();
      })
      .then(data => {
        setPedidos(data);
        setError(null);
      })
      .catch(err => setError(err.message));
  };

  useEffect(() => {
    cargarPedidos();
    const intervalo = setInterval(cargarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const borrarPedido = (id) => {
    fetch(`http://localhost:5000/api/v1/pedidos/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al borrar pedido');
        return res.json();
      })
      .then(() => {
        cargarPedidos();
      })
      .catch(err => setError(err.message));
  };

  const guardarEdicion = (e) => {
    e.preventDefault();

    const pedidoActualizado = {
      mesa: editPedido.mesa,
      comida: editPedido.comida,
      bebida: editPedido.bebida,
      cantidadComida: Number(editPedido.cantidadComida),
      cantidadBebida: Number(editPedido.cantidadBebida),
      total: Number(editPedido.total),
      timestamp: editPedido.timestamp
    };

    fetch(`http://localhost:5000/api/v1/pedidos/${editPedido._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedidoActualizado)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar pedido');
        return res.json();
      })
      .then(() => {
        setEditPedido(null);
        cargarPedidos();
      })
      .catch(err => setError(err.message));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPedido(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h1>Pedidos de La Taberna de Egia</h1>

      {error && <p className="error">{error}</p>}

      {pedidos.length === 0 ? (
        <p>No hay pedidos pendientes.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Comida</th>
              <th>Cantidad Comida</th>
              <th>Bebida</th>
              <th>Cantidad Bebida</th>
              <th>Total (€)</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido._id}>
                <td>{pedido.mesa || '-'}</td>
                <td>{pedido.comida || '-'}</td>
                <td>{pedido.cantidadComida ?? '-'}</td>
                <td>{pedido.bebida || '-'}</td>
                <td>{pedido.cantidadBebida ?? '-'}</td>
                <td>{pedido.total !== undefined ? pedido.total.toFixed(2) : '-'}</td>
                <td>{new Date(pedido.timestamp).toLocaleString()}</td>
                <td>
                  <button onClick={() => borrarPedido(pedido._id)}>Borrar</button>
                  <button onClick={() => setEditPedido(pedido)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editPedido && (
        <form onSubmit={guardarEdicion} style={{ marginTop: '20px' }}>
          <h3>Editando pedido mesa {editPedido.mesa}</h3>

          <label>
            Mesa:
            <input
              type="text"
              name="mesa"
              value={editPedido.mesa}
              onChange={handleChange}
            />
          </label>

          <label>
            Comida:
            <input
              type="text"
              name="comida"
              value={editPedido.comida}
              onChange={handleChange}
            />
          </label>

          <label>
            Cantidad Comida:
            <input
              type="number"
              name="cantidadComida"
              value={editPedido.cantidadComida}
              onChange={handleChange}
              min="0"
            />
          </label>

          <label>
            Bebida:
            <input
              type="text"
              name="bebida"
              value={editPedido.bebida}
              onChange={handleChange}
            />
          </label>

          <label>
            Cantidad Bebida:
            <input
              type="number"
              name="cantidadBebida"
              value={editPedido.cantidadBebida}
              onChange={handleChange}
              min="0"
            />
          </label>

          <label>
            Total (€):
            <input
              type="number"
              name="total"
              step="0.01"
              value={editPedido.total}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={() => setEditPedido(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
}

export default VistaCamarero;
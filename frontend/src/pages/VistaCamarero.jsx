import React, { useEffect, useState } from 'react';
import './taberna.css';

function VistaCamarero() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VistaCamarero;


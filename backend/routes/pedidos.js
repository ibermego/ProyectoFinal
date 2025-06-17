import express from 'express';
const router = express.Router();

// POST /api/v1/pedidos
router.post('/', async (req, res) => {
  try {
    const pedido = req.body;
    const db = req.app.locals.db;
    const result = await db.collection('pedidos').insertOne(pedido);
    res.status(201).json({ message: 'Pedido recibido', id: result.insertedId });
  } catch (error) {
    console.error('Error al guardar pedido:', error);
    res.status(500).json({ error: 'Error al guardar el pedido' });
  }
});

export default router;

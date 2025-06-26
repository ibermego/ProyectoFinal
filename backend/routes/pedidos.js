import express from 'express';
import { ObjectId } from 'mongodb';
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


router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const pedidos = await db.collection('pedidos').find().toArray();
    res.json(pedidos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: 'Failed to fetch pedidos' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    const result = await db.collection('pedidos').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ message: `Pedido con id ${id} eliminado` });
  } catch (error) {
    console.error("Error deleting pedido:", error);
    res.status(500).json({ error: 'Failed to delete pedido' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No hay datos para actualizar' });
    }

    if (updateData._id) delete updateData._id;

    const result = await db.collection('pedidos').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ message: `Pedido con id ${id} actualizado` });
  } catch (error) {
    console.error("Error updating pedido:", error);
    res.status(500).json({ error: 'Fallo al actualizar pedido' });
  }
});


export default router;
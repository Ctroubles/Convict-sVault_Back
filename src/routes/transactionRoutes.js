const express = require('express');
const { Router }= require("express");
const { getAllTransactions, getTransactionById, updateTransactionById, deleteTransactionById, createTransaction, calcularIngresos } = require('../controllers/transactionCtrl');


const transactionRoutes= Router()
// Ruta para obtener todas las transacciones
transactionRoutes.get('/', async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
});

// Ruta para obtener una transacción por ID
transactionRoutes.get('/element/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await getTransactionById(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la transacción' });
  }
});

transactionRoutes.get('/ingresos', async (req, res) => {
    try {
      const ingresos = await calcularIngresos();
      res.json({ ingresos });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  });
// Ruta para crear una nueva transacción
transactionRoutes.post('/create', async (req, res) => {
  const transactionData = req.body;
  try {
    const newTransaction = await createTransaction(transactionData);
    res.json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

// Ruta para actualizar una transacción por ID
transactionRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const transactionData = req.body;
  try {
    const updatedTransaction = await updateTransactionById(id, transactionData);
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la transacción' });
  }
});

// Ruta para eliminar una transacción por ID
transactionRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await deleteTransactionById(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.json({ message: 'Transacción eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la transacción' });
  }
});

module.exports = transactionRoutes;

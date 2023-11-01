const express = require('express');
const { Router }= require("express");
const { getAllTransactions, getTransactionById, updateTransactionById, deleteTransactionById, createTransaction, calcularIngresos, calculateApprovedCount, getTransactionsByRefPayco } = require('../controllers/transactionCtrl');


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

transactionRoutes.get('/compras/:xRefPayco', async (req, res) => {
  const { xRefPayco } = req.params;

  try {
    const transactions = await getTransactionsByRefPayco(xRefPayco);

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No se encontraron transacciones con el xRefPayco proporcionado.' });
    }

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones por xRefPayco.' });
  }
});

// Ruta para obtener una transacción por ID
transactionRoutes.get('/element/:xRefPayco', async (req, res) => {
  const { xRefPayco } = req.params;
  try {
    const transaction = await getTransactionById(xRefPayco);
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

  transactionRoutes.get('/approved-count', async (req, res) => {
    try {
      const approvedCount = await calculateApprovedCount();
      res.json({ approvedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  });
// Ruta para crear una nueva transacción

transactionRoutes.post('/create', async (req, res) => {
  const { xRefPayco, xdescription, xresponse, productIds, xAmount } = req.body;

  // Validación de entrada
  if (!xRefPayco || !xdescription || !xresponse || !productIds) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const newTransaction = await createTransaction({ xRefPayco, xdescription, xresponse, productIds, xAmount });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Ruta para actualizar una transacción por ID
transactionRoutes.put('/:xRefPayco', async (req, res) => {
  const { xRefPayco } = req.params;
  const { xdescription, xresponse, productIds, xAmount } = req.body;
  try {
    const updatedTransaction = await updateTransactionById(xRefPayco, { xdescription, xresponse, productIds, xAmount, xRefPayco });
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
transactionRoutes.delete('/:xRefPayco', async (req, res) => {
  const { xRefPayco } = req.params;
  try {
    const deletedTransaction = await deleteTransactionById(xRefPayco);
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

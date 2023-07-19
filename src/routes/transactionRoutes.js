const express = require('express');
const { Router }= require("express");
const { getAllTransactions, getTransactionById, updateTransactionById, deleteTransactionById, createTransaction, calcularIngresos, calculateApprovedCount } = require('../controllers/transactionCtrl');


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

// transactionRoutes.post('/create', async (req, res) => {
//   const transactionData = req.body;
//   try {
//     const newTransaction = await createTransaction(transactionData);
//     res.json(newTransaction);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error.message);
//   }
// });

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


// transactionRoutes.post('/confirmation/confirmation', async (req, res) => {
//   const {
//     merchantId,
//     merchant_name,
//     merchant_address,
//     telephone,
//     merchant_url,
//     transactionState,
//     lapTransactionState,
//     message,
//     referenceCode,
//     reference_pol,
//     transactionId,
//     description,
//     trazabilityCode,
//     cus,
//     orderLanguage,
//     extra1,
//     extra2,
//     extra3,
//     polTransactionState,
//     signature,
//     polResponseCode,
//     lapResponseCode,
//     risk,
//     polPaymentMethod,
//     lapPaymentMethod,
//     polPaymentMethodType,
//     lapPaymentMethodType,
//     installmentsNumber,
//     TX_VALUE,
//     TX_TAX,
//     currency,
//     lng,
//     pseCycle,
//     buyerEmail,
//     pseBank,
//     pseReference1,
//     pseReference2,
//     pseReference3,
//     authorizationCode,
//     TX_ADMINISTRATIVE_FEE,
//     TX_TAX_ADMINISTRATIVE_FEE,
//     TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE,
//     processingDate
//   } = req.body;
  
//   try {
//     console.log({
//       merchantId,
//       merchant_name,
//       merchant_address,
//       telephone,
//       merchant_url,
//       transactionState,
//       lapTransactionState,
//       message,
//       referenceCode,
//       reference_pol,
//       transactionId,
//       description,
//       trazabilityCode,
//       cus,
//       orderLanguage,
//       extra1,
//       extra2,
//       extra3,
//       polTransactionState,
//       signature,
//       polResponseCode,
//       lapResponseCode,
//       risk,
//       polPaymentMethod,
//       lapPaymentMethod,
//       polPaymentMethodType,
//       lapPaymentMethodType,
//       installmentsNumber,
//       TX_VALUE,
//       TX_TAX,
//       currency,
//       lng,
//       pseCycle,
//       buyerEmail,
//       pseBank,
//       pseReference1,
//       pseReference2,
//       pseReference3,
//       authorizationCode,
//       TX_ADMINISTRATIVE_FEE,
//       TX_TAX_ADMINISTRATIVE_FEE,
//       TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE,
//       processingDate
//     });

//       // await createTransaction(newTransaction)

//       // Ejemplo de respuesta exitosa
//       return res.status(200).send('Transacción exitosa');
     
//   } catch (error) {
//     return res.status(411).send(error);
//   }
// });

module.exports = transactionRoutes;

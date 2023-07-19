const Transaction = require('../models/transaction');

const getAllTransactions = async () => {
  try {
    return await Transaction.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTransactionById = async (transactionId) => {
  try {
    return await Transaction.findById(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createTransaction = async (transactionData) => {
  try {
    console.log("hola",transactionData)
    return await Transaction.create(transactionData);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTransactionById = async (transactionId, transactionData) => {
  try {
    return await Transaction.findByIdAndUpdate(transactionId, transactionData, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTransactionById = async (transactionId) => {
  try {
    return await Transaction.findByIdAndDelete(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const calcularIngresos = async () => {
    try {
      const transactions = await Transaction.find({ state: '4' });
      const ingresos = transactions.reduce((total, transaction) => total + transaction.total, 0);
      console.log('Ingresos totales:', ingresos);
      return ingresos
      // Aquí puedes realizar las acciones necesarias con los ingresos, como mostrarlos en la interfaz de usuario o guardarlos en una variable de estado.
    } catch (error) {
      console.error('Error al calcular los ingresos:', error);
    }

};

const calculateApprovedCount = async () => {
    try {
      const approvedTransactions = await Transaction.find({ state: '4' });
      const approvedCount = approvedTransactions.length;
  
      return approvedCount;
    } catch (error) {
      throw new Error('Error al calcular la cantidad de transacciones aprobadas');
    }
  };
module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionById,
  deleteTransactionById,
  calcularIngresos,
  calculateApprovedCount,
};

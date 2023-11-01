const Compras = require('../models/transaction');

const getAllTransactions = async () => {
  try {
    return await Compras.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTransactionsByRefPayco = async (xRefPayco) => {
  try {
    return await Compras.find({ xRefPayco });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTransactionById = async (xRefPayco) => {
  try {
    return await Compras.findById({xRefPayco});
  } catch (error) {
    throw new Error(error.message);
  }
};

const createTransaction = async ({ xdescription, xresponse, productId, xAmount,  xRefPayco }) => {
  try {
    console.log("hola", xdescription, xresponse, productId, xAmount, xRefPayco);

    // Intenta encontrar una transacción existente con el mismo xRefPayco
    const existingTransaction = await Compras.findOne({ xRefPayco });

    if (existingTransaction) {
      // Si existe, lanza una excepción o devuelve un mensaje personalizado
      return 'Ya existe una transacción con este xRefPayco.';
    }

    // Si no existe, crea una nueva transacción
    const data = { xdescription, xresponse, productId, xAmount, xRefPayco };
    const newTransaction = await Compras.create(data);
    return newTransaction;
  } catch (error) {
    throw new Error(error.message);
  }
};



const updateTransactionById = async (xRefPayco, { xdescription, xresponse, productId, xAmount }) => {
  try {
    return await Compras.findByIdAndUpdate(xRefPayco, { xdescription, xresponse, productId, xAmount }, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTransactionById = async (xRefPayco) => {
  try {
    return await Compras.findByIdAndDelete(xRefPayco);
  } catch (error) {
    throw new Error(error.message);
  }
};

const calcularIngresos = async () => {
    try {
      const transactions = await Compras.find({ state: '4' });
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
      const approvedTransactions = await Compras.find({ state: '4' });
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
  getTransactionsByRefPayco
};

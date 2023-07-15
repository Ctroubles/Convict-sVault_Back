const { Schema, model }= require("mongoose");

// Definición del esquema de la transacción
const transactionSchema= new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  state: {
    type: String,
    enum: ['4', '5', '6', '7', '104'],
    default: '7',
  },
});

// Creación del modelo Transaction basado en el esquema
const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;

const { Schema, model }= require("mongoose");

// Definición del esquema de la transacción
const ComprasSchema = new Schema({
  xRefPayco: {
    type: String, // Configura el tipo de campo como String
    unique: true, // Asegura que sea único
    required: true, // Asegura que sea requerido
  },
  xAmount: {
    type: String,
    required: true,
    min: 0,
  },
  xdescription: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  xresponse: {
    type: String,
    enum: ['Aceptada', 'Rechazada', 'Cancelada'],
    default: 'Cancelada',
  },
  productIds: {
    type: Array,
    required: true,
  }
});

// Creación del modelo Transaction basado en el esquema
const Compras = model('Compras', ComprasSchema);

module.exports = Compras;

const { Schema, model }= require("mongoose");

const allowedCategories = [
    "Equipaje",
    "Belleza",
    "Joyeria",
    "Tecnologia",
    "Calzado",
    "Juguetes",
    "Muebles",
    "Ropa",
    "Artesania",
    "Agropecuario",
    "Servicios",
    "Repuestos"
  ];

  
const productosSchema= new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 30
          },
          price: {
            type: Number,
            required: true,
            min: 0
          },
          image: {
            type: String,
            required: true,
          },
          brand: {
            type: String,
            maxlength: 20
          },
          category: {
            type: [{
            type: String,
            enum: allowedCategories
            }],
            required: true
          },
          stock: {
            type: Number,
            required: true,
            min: 0 
          },
          isActive: {
            type: Boolean,
            default: true,
          }
        });

const Product= model("productos", productosSchema) 

module.exports= Product;
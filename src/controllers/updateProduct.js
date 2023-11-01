const Products = require("../models/products_models");

exports.updateProducts = async (id, data) => {
  const product = await Products.findOne({ _id: id });
  if (!product) throw `No product found with that ${id}`;

  console.log('Datos antes de la actualización:', product);

  product.name = data.name;
  product.price = data.price;
  product.image = data.image;
  product.brand = data.brand;
  product.category = data.category;
  product.stock = data.stock;
  product.isActive = data.isActive;

  console.log('Datos después de la actualización:', product);

  return await product.save();
};

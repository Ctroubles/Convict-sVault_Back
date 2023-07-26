const Products = require("../models/products_models");

const allProducts= async()=>{
    return await Products.find()
}

const findProduct= async(name)=>{
    const regExpName= new RegExp(name, 'i');
    const prodByName= await Products.find({name: regExpName});
    if(!prodByName.length) throw `There is not products with this ${name}`;
    else return prodByName;
}

const findProductsByIsActive = async () => {
    try {
      const activeProducts = await Products.find({ isActive: true });
      return activeProducts;
    } catch (error) {
      throw new Error(`Error al obtener los productos activos: ${error.message}`);
    }
  };
  
  const findProductsByIsInactive = async () => {
    try {
      const inactiveProducts = await Products.find({ isActive: false });
      return inactiveProducts;
    } catch (error) {
      throw new Error(`Error al obtener los productos inactivos: ${error.message}`);
    }
  };

const findById= async(id)=>{
    const product= await Products.findOne({_id:id}).catch(e=>{throw`There is not products with this ${id}`});
    if (product === null) {
        throw Error(`There is not products with this ${id}`)
    }
    return product;
}

const findByCategory = async (category) => {
    const regExpCategory = new RegExp(category, "i");
    const prodByCategory = await Products.find({ category: { $in: [regExpCategory] }, isActive: true });

    if (!Array.isArray(prodByCategory)) {
      throw new Error(`No hay productos con la categoría '${category}'.`);
    }
    return prodByCategory;
  };
  
module.exports={
    findById,
    findProduct,
    allProducts,
    findByCategory,
    findProductsByIsInactive,
    findProductsByIsActive
}
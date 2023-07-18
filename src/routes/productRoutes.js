const { Router }= require("express");
const {allProducts, findById, findProduct, findByCategory, findProductsByIsInactive, findProductsByIsActive}= require("../controllers/getProducts.js");
const  createProduct  = require("../controllers/createProduct.js");
const deleteProduct = require("../controllers/deleteProduct.js");
const { updateProducts } = require("../controllers/updateProduct.js");
const updateProductIsActive = require("../controllers/updateProductIsActive.js")

const productRoutes= Router();

productRoutes.get("/", async(req, res)=>{
    const {name}= req.query;
    try {
        if(name){
            res.status(201).send(await findProduct(name))
        }
        else return res.status(201).send(await allProducts())
    } catch (error) {
        res.status(404).send(error.message)
    }
})

productRoutes.get("/active", async (req, res) => {
    try {
      const activeProducts = await findProductsByIsActive(true);
      res.status(200).send(activeProducts);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });
  
  productRoutes.get("/inactive", async (req, res) => {
    try {
      const inactiveProducts = await findProductsByIsInactive(false);
      res.status(200).send(inactiveProducts);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });
  

productRoutes.get("/:id", async(req, res)=>{
    const {id}= req.params;
    try {
        return res.status(201).send(await findById(id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

productRoutes.get("/category/:category", async(req, res)=>{
    const {category}= req.params;
    try {
        const result= await findByCategory(category)
        res.status(201).send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// productRoutes.post("/", async(req, res)=>{
//     try {
//         res.status(201).send(await createProduct(req.body))
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })

productRoutes.delete("/:id", async(req, res)=>{
    try {
        const {id}= req.params;
        await deleteProduct(id);
        res.status(201).send({status:"the product was deleted successfully"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

productRoutes.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedProduct = await updateProducts(id, data);
        res.status(200).send({ status: "The product was updated successfully", product: updatedProduct });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

  productRoutes.put("/isActive/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const { isActive } = data;
  
      if (typeof isActive !== 'undefined') {
        // Cambiar el valor de isActive
        await updateProductIsActive(id, isActive);
        res.status(200).send({ status: "The product's isActive was updated successfully" });
      } else {
        // Actualizar todos los campos del producto
        const updatedProduct = await updateProducts(id, data);
        res.status(200).send({ status: "The product was updated successfully", product: updatedProduct });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
module.exports= productRoutes
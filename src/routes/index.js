const { Router } = require('express');
const productRoutes= require("./productRoutes")
const uploadProducts= require("../controllers/CloudinaryControl")
const userRoutes= require("./userRoutes")
const cartRoutesc = require('./cartHandlerRoutes');
const pagosRoutes= require("./pagosRoutes");
const transactionRoutes = require('./transactionRoutes');

const router = Router();

router.use("/products", productRoutes)
router.use("/upload", uploadProducts)
router.use("/users", userRoutes)
router.use("/cart", cartRoutesc)
router.use("/pagos", pagosRoutes)
router.use("/transactions", transactionRoutes)


module.exports = router;

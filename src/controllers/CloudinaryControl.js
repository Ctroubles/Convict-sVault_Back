// const multer = require('multer');
// const createProduct = require('./createProduct');
// const cloudinary = require('cloudinary').v2;
// const { Router } = require('express');
// const uploadProducts = Router();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: "dfu27fldw",
//   api_key: "992184143386788",
//   api_secret: "Bq9jRJgMWTwBqzxwTVBESzal5Uo",
//   secure: true
// });

// // Configuración de multer para almacenar los archivos en el directorio "uploads"
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Generar un nombre único para el archivo
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// // Middleware de multer para manejar la carga de archivos
// const upload = multer({ storage: storage });

// // Función para subir la imagen a Cloudinary y obtener el publicId
// const uploadImage = async (imagePath) => {
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result; // Devolver el objeto completo de la respuesta de Cloudinary
//   } catch (error) {
//     console.error(error);
//   }
// };

// uploadProducts.post("/", upload.single('image'), async (req, res) => {
//   try {
//     const imagePath = req.file.path; // Obtener la ruta del archivo subido
//     const result = await uploadImage(imagePath);
//     const { name, category, price, brand, stock } = req.body;


//     const imageUrl = result.secure_url;


//     const newObject = {
//       name: name,
//       category: category,
//       price: price,
//       brand: brand,
//       stock: stock,
//       image: imageUrl // Guardar la URL segura en lugar de la ruta local
//     }

//     const newProduct = await createProduct(newObject);

//     res.status(201).send(newProduct);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });


// module.exports = uploadProducts;



const multer = require('multer');
const createProduct = require('./createProduct');
const cloudinary = require('cloudinary').v2;
const { Router } = require('express');
const uploadProducts = Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfu27fldw",
  api_key: "992184143386788",
  api_secret: "Bq9jRJgMWTwBqzxwTVBESzal5Uo",
  secure: true
});

// Middleware de multer para manejar la carga de archivos
const upload = multer();

// Función para subir la imagen a Cloudinary y obtener el publicId
const uploadImage = async (file) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(file.buffer, options);
    console.log(result);
    return result; // Devolver el objeto completo de la respuesta de Cloudinary
  } catch (error) {
    console.error(error);
    throw new Error("Error al subir la imagen a Cloudinary");
  }
};

uploadProducts.post("/", upload.single('image'), async (req, res) => {
  try {
    const result = await uploadImage(req.file);
    const { name, category, price, brand, stock } = req.body;
    const imageUrl = result.secure_url;

    const newObject = {
      name: name,
      category: category,
      price: price,
      brand: brand,
      stock: stock,
      image: imageUrl // Guardar la URL segura en lugar de la ruta local
    }

    const newProduct = await createProduct(newObject);

    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = uploadProducts;

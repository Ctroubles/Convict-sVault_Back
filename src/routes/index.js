const { Router } = require('express');
const productRoutes= require("./productRoutes")
const uploadProducts= require("../controllers/CloudinaryControl")
const userRoutes= require("./userRoutes")
const cartRoutesc = require('./cartHandlerRoutes');
const pagosRoutes= require("./pagosRoutes");
const transactionRoutes = require('./transactionRoutes');
const bodyParser = require('body-parser');
const { createTransaction } = require('../controllers/transactionCtrl');
const GenereteToken = require('../Epeyco/implementacion');
const { default: axios } = require('axios');
const makePaymentWithToken = require('../Epeyco/crearSession');
const validateRestrictiveList = require('../Epeyco/listasRestrictivas');
const MetodosDePago = require('../Epeyco/metodosPago');
const createTransactionPSE = require('../Epeyco/pse/CreateTransactionPSE');
const confirmation = require('../Epeyco/pse/confirmationPSE.JS');
const efecty = require('../Epeyco/efectivo/efectivo');
const credito = require('../Epeyco/credito/credito');
const trannsactionDtail = require('../Epeyco/detallesTranasaction');


const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use("/products", productRoutes)
router.use("/upload", uploadProducts)
router.use("/users", userRoutes)
router.use("/cart", cartRoutesc)
router.use("/pagos", pagosRoutes)
router.use("/transactions", transactionRoutes)


    router.post('/confirmation',  (req, res)=>{
      try {
        const datosEpayco = req.body;
        res.status(200).send(datosEpayco)
      } catch (error) {
        res.status(404).send(error)
      }
      
    })


    router.get('/generate-token', async (req, res) => {
      try {
        const token = await GenereteToken();
    
        res.status(200).send(token);
      } catch (error) {
        res.status(400).json({ error: 'Error al generar el token' });
      }
    });

    
    router.get('/transaction/details', async (req, res)=>{
      try {
        const token = await GenereteToken();
        const response = await trannsactionDtail(token);
        res.json(response.data)
      } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error al obtener los detalles de la transaccion' })
      }
    })
    router.post('/session', async (req, res) => {
      try {
        const datos= {
          name,
          description,
          currency,
          amount,
          country,
          test,
          ip,
          invoice,
          extra1,
          extra2,
          extra3,
          // acepted,
          // rejected,
          // pending,
        } = req.body;
        console.log("estos son los datos:",datos)
    
        const token = await GenereteToken();
        console.log(token)
        if (!token) {
          console.log('Error al obtener el token');
          res.status(500).json({ message: 'Payment failed' });
          return;
        }
    
        const response = await makePaymentWithToken(token, datos);
        console.log("sessionID:", response.sessionId);
    
        // Aquí puedes enviar una respuesta al cliente si es necesario.
        res.status(200).json(response); // Envía el objeto response directamente
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Payment failed' });
      }
    });

    router.get('/metodos-pago', async (req, res) => {
      try {
        const token = await GenereteToken();
        const response = await MetodosDePago(token);
        res.json(response.data);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error al obtener los métodos de pago' });
      }
    });

    router.post('/transaction/pse', async (req, res) => {
      try {
        const token = await GenereteToken();
        const response = await createTransactionPSE(token);
        console.log("Respuesta PSE:", response.data);
    
        // Obtener el transactionID de la respuesta.
        const transactionID = response.data.transactionID;
    
        // Aquí puedes enviar una respuesta al cliente si es necesario, en este caso se envía la respuesta del endpoint externo.
        res.status(200).send({ transactionID });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error al crear la transacción PSE' });
      }
    });
    

    router.post('/transaction/confirmation', async (req, res) => {
      try {
        const token = await GenereteToken();
        const { transactionID, response } = await createTransactionPSE(token);
        console.log("Respuesta PSE:", response);
    
        // Llama a la función de confirmación y pasa el token y el transactionID como parámetros.
        const confirmationResponse = await confirmation(token, transactionID);
    
        // Envía la respuesta de la confirmación al cliente.
        res.status(200).send(confirmationResponse);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error confirming transaction' });
      }
    });


    router.post('/transaction/efecty', async (req, res) => {
      try {
        const token = await GenereteToken();
        const efectyResponse = await efecty(token);
        console.log("Respuesta Efecty:", efectyResponse);
    
        // Aquí puedes enviar una respuesta al cliente si es necesario, en este caso se envía la respuesta de la transacción con efecty.
        res.status(200).send(efectyResponse);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error al crear la transacción con Efecty' });
      }
    });
    router.post('/transaction/credito', async (req, res) => {
      try {
        const token = await GenereteToken();
        const creditoResponse = await credito(token);
        console.log("Respuesta Credito:", creditoResponse);
    
        // Aquí puedes enviar una respuesta al cliente si es necesario, en este caso se envía la respuesta de la transacción con tarjeta de crédito.
        res.status(200).send(creditoResponse);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error al crear la transacción con tarjeta de crédito' });
      }
    });

module.exports= router

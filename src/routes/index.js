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

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use("/products", productRoutes)
router.use("/upload", uploadProducts)
router.use("/users", userRoutes)
router.use("/cart", cartRoutesc)
router.use("/pagos", pagosRoutes)
router.use("/transactions", transactionRoutes)


// router.post('/confirmation/confirmation', async (req, res) => {
//       const {
//         merchantId,
//         merchant_name,
//         merchant_address,
//         telephone,
//         merchant_url,
//         transactionState,
//         lapTransactionState,
//         message,
//         referenceCode,
//         reference_pol,
//         transactionId,
//         description,
//         trazabilityCode,
//         cus,
//         orderLanguage,
//         extra1,
//         extra2,
//         extra3,
//         polTransactionState,
//         signature,
//         polResponseCode,
//         lapResponseCode,
//         risk,
//         polPaymentMethod,
//         lapPaymentMethod,
//         polPaymentMethodType,
//         lapPaymentMethodType,
//         installmentsNumber,
//         TX_VALUE,
//         TX_TAX,
//         currency,
//         lng,
//         pseCycle,
//         buyerEmail,
//         pseBank,
//         pseReference1,
//         pseReference2,
//         pseReference3,
//         authorizationCode,
//         TX_ADMINISTRATIVE_FEE,
//         TX_TAX_ADMINISTRATIVE_FEE,
//         TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE,
//         processingDate
//       } = req.body;
      
//       try {
//         if (transactionState === '4' && polResponseCode === '1') {
//         const transactionData = {
//         //   merchantId,
//         //   merchant_name,
//         //   merchant_address,
//         //   telephone,
//         //   merchant_url,
//           state:transactionState,
//         //   lapTransactionState,
//         //   message,
//         //   referenceCode,
//         //   reference_pol,
//           transactionId,
//           description,
//         //   trazabilityCode,
//         //   cus,
//         //   orderLanguage,
//           extra1,
//         //   extra2,
//         //   extra3,
//         //   polTransactionState,
//         //   signature,
//           polResponseCode,
//         //   lapResponseCode,
//         //   risk,
//         //   polPaymentMethod,
//         //   lapPaymentMethod,
//         //   polPaymentMethodType,
//         //   lapPaymentMethodType,
//         //   installmentsNumber,
//           total:TX_VALUE,
//         //   TX_TAX,
//         //   currency,
//         //   lng,
//         //   pseCycle,
//         //   buyerEmail,
//         //   pseBank,
//         //   pseReference1,
//         //   pseReference2,
//         //   pseReference3,
//         //   authorizationCode,
//         //   TX_ADMINISTRATIVE_FEE,
//         //   TX_TAX_ADMINISTRATIVE_FEE,
//         //   TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE,
//         //   processingDate
//         };
    
//         const newTransaction = await createTransaction(transactionData);
//           return res.status(200).send(transactionData);
//     }else{
//         res.status(403).send("algo salio maaaaaaal")
//     }
         
//       } catch (error) {
//         return res.status(411).send(error.message);
//       }
//     });


    router.get('/generate-token', async (req, res) => {
      try {
        const token = await GenereteToken();
    
        res.status(200).send(token);
      } catch (error) {
        res.status(400).json({ error: 'Error al generar el token' });
      }
    });


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
        // Aquí obtienes el token necesario para realizar la solicitud
        const token = await GenereteToken(); // Asegúrate de tener la función GenereteToken correctamente implementada
        
        // Llamas a la función MetodosDePago para obtener los métodos de pago
        const response = await MetodosDePago(token);
        
        // Envías la respuesta al cliente
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




    // router.post('/validate-restrictive-list', async (req, res) => {
    //   try {
    //     const jwt_token = 'YOUR_JWT_TOKEN'; // Reemplaza con tu token JWT válido
    //     const result = await validateRestrictiveList(jwt_token);
    
    //     // Aquí puedes enviar la respuesta al cliente con el resultado
    //     res.json(result);
    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: 'Error during validation' });
    //   }
    // });

module.exports = router;

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
        await makePaymentWithToken();
    
        // Aquí puedes enviar una respuesta al cliente si es necesario.
        res.status(200).json({ message: 'Payment successful' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Payment failed' });
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

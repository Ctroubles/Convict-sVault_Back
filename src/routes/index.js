const { Router } = require('express');
const productRoutes= require("./productRoutes")
const uploadProducts= require("../controllers/CloudinaryControl")
const userRoutes= require("./userRoutes")
const cartRoutesc = require('./cartHandlerRoutes');
const pagosRoutes= require("./pagosRoutes");
const transactionRoutes = require('./transactionRoutes');
const bodyParser = require('body-parser');
const { createTransaction } = require('../controllers/transactionCtrl');

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use("/products", productRoutes)
router.use("/upload", uploadProducts)
router.use("/users", userRoutes)
router.use("/cart", cartRoutesc)
router.use("/pagos", pagosRoutes)
router.use("/transactions", transactionRoutes)


router.post('/confirmation/confirmation', async (req, res) => {
      const {
        merchantId,
        merchant_name,
        merchant_address,
        telephone,
        merchant_url,
        transactionState,
        lapTransactionState,
        message,
        referenceCode,
        reference_pol,
        transactionId,
        description,
        trazabilityCode,
        cus,
        orderLanguage,
        extra1,
        extra2,
        extra3,
        polTransactionState,
        signature,
        polResponseCode,
        lapResponseCode,
        risk,
        polPaymentMethod,
        lapPaymentMethod,
        polPaymentMethodType,
        lapPaymentMethodType,
        installmentsNumber,
        TX_VALUE,
        TX_TAX,
        currency,
        lng,
        pseCycle,
        buyerEmail,
        pseBank,
        pseReference1,
        pseReference2,
        pseReference3,
        authorizationCode,
        TX_ADMINISTRATIVE_FEE,
        TX_TAX_ADMINISTRATIVE_FEE,
        TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE,
        processingDate
      } = req.body;
      
      try {
        if (transactionState === '4' && polResponseCode === '1') {
        const transactionData = {
        //   merchantId,
        //   merchant_name,
        //   merchant_address,
        //   telephone,
        //   merchant_url,
          state:transactionState,
        //   lapTransactionState,
        //   message,
        //   referenceCode,
        //   reference_pol,
          transactionId,
          description,
        //   trazabilityCode,
        //   cus,
        //   orderLanguage,
          extra1,
        //   extra2,
        //   extra3,
        //   polTransactionState,
        //   signature,
          polResponseCode,
        //   lapResponseCode,
        //   risk,
        //   polPaymentMethod,
        //   lapPaymentMethod,
        //   polPaymentMethodType,
        //   lapPaymentMethodType,
        //   installmentsNumber,
          total:TX_VALUE,
        //   TX_TAX,
        //   currency,
        //   lng,
        //   pseCycle,
        //   buyerEmail,
        //   pseBank,
        //   pseReference1,
        //   pseReference2,
        //   pseReference3,
        //   authorizationCode,
        //   TX_ADMINISTRATIVE_FEE,
        //   TX_TAX_ADMINISTRATIVE_FEE,
        //   TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE,
        //   processingDate
        };
    
        const newTransaction = await createTransaction(transactionData);
          return res.status(200).send(transactionData);
    }else{
        res.status(403).send("algo salio maaaaaaal")
    }
         
      } catch (error) {
        return res.status(411).send(error.message);
      }
    });


module.exports = router;

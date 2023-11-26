var axios = require('axios');
const GenereteToken = require('../Epeyco/implementacion');

async function makePaymentWithToken(token, datos) {
    try {
      const url_apify = 'https://apify.epayco.co/';
      var data = {
        name: datos.name || 'New Checkout',
        invoice:datos.invoice || 'prueba 121',
        description:datos.description || 'Nueva implementacion de seguridad',
        currency:datos.currency || 'cop',
        amount:datos.amount || '10000',
        country:datos.country || 'CO',
        extra1: datos.extra1,
        test:datos.test || 'false',
        ip:datos.ip || '186.97.212.162'
      };
  
      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${url_apify}payment/session/create`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: data
      };
      const response = await axios(config);
      // Aquí seleccionamos solo los datos relevantes para evitar referencias circulares
      const responseData = {
        success: response.data.success,
        titleResponse: response.data.titleResponse,
        textResponse: response.data.textResponse,
        lastAction: response.data.lastAction,
        sessionId: response.data.data.sessionId,
      };
  
      console.log("hola22222222", responseData);
  
      // Devuelve solo los datos relevantes de la respuesta
      return responseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  module.exports = makePaymentWithToken;
  
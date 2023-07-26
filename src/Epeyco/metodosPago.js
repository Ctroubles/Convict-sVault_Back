var axios = require('axios');


async function MetodosDePago(token){

    const url_apify = 'https://apify.epayco.co/';
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${url_apify}/transaction/payment/methods`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
    
    try {
        const response = await axios(config);
        return response.data; // Devuelve los métodos de pago obtenidos
      } catch (error) {
        console.log(error);
        throw error; // Lanza el error para que se maneje en la ruta /metodos-pago
      }
    }

module.exports= MetodosDePago
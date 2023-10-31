const axios = require('axios');

async function transactionDetail(token) {
  try {
    const url_apify = 'https://apify.epayco.co'; // Verifica el URL correcto
    const data = JSON.stringify({
      "filter": {
        "referencePayco": 172885244
      }
    });

    const config = {
      method: 'get',
      url: `${url_apify}/transaction/detail`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios(config); // Utiliza async/await para obtener la respuesta
    console.log(JSON.stringify(response.data));
    return response.data; // Devuelve la respuesta
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = transactionDetail;

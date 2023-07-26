var axios = require('axios');


async function createTransactionPSE(token){

    const url_apify = 'https://apify.epayco.co/';
    var data = JSON.stringify({
        "bank": "1022",
        "value": "5000",
        "docType": "NIT",
        "docNumber": "232331032",
        "name": "dsaas",
        "lastName": "SSSSS",
        "email": "cjadssonoe@hotmail.com",
        "cellPhone": "3115557457",
        "ip": "195.000.000.000",
        "urlResponse": "www.prueba.com",
        "phone": "0000000",
        "tax": 19,
        "taxBase": 2000,
        "description": "Prueba",
        "invoice": "1221288546",
        "currency": "COP",
        "typePerson": "1",
        "address": "Crr86#56-415",
        "urlConfirmation": "www.pruebaconfirmacion.com",
        "methodConfimation": "GET",
        "extra1": "",
        "extra2": "",
        "extra3": ""
});

var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url_apify}payment/process/pse`,
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    data : data
};

try {
  const response = await axios(config);
  const transactionID = response.data.transactionID;
  return { transactionID, response: response.data };
} catch (error) {
  console.log(error);
  throw error;
}
}


module.exports= createTransactionPSE
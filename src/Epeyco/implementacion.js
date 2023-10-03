var axios = require('axios');

async function GenereteToken() {
  const EPAYCO_PUBLIC_KEY2 = process.env.EPAYCO_PUBLIC_KEY2;
  const EPAYCO_PRIVATE_KEY2 = process.env.EPAYCO_PRIVATE_KEY2;
  const clientId = '961319';

  var url_apify = 'https://apify.epayco.co/';
  var data = ''; // Debes asignar aquí los datos necesarios para generar el token

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url_apify}login`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`e95deec204ee959cd0fad3b4c2082d54:e244fdc8a0b2b994132f2b1b9baf9692`).toString('base64')}`,
    },
    data: data
  };

  try {
    const response = await axios(config);
    const token = response.data.token;
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = GenereteToken;
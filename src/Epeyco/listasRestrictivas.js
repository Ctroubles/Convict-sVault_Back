// validationRoute.js
const axios = require('axios');

function validateRestrictiveList(jwt_token) {
  const url_apify = 'https://apify.epayco.co';

  const data = JSON.stringify({
    "docNumber": 1035863428,
    "docType": "CC"
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url_apify}/validation/restrictive/list`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt_token}`
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      console.log(response.data)
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

module.exports = validateRestrictiveList;

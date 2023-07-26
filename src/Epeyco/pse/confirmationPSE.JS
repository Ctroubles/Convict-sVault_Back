var axios = require('axios');


async function confirmation(token, transactionID){

    console.log("hol222222222222222222a",transactionID)
    var data = JSON.stringify({
        "transactionID":transactionID || 3403177
    });
    const url_apify = 'https://apify.epayco.co/';
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${url_apify}payment/pse/transaction`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data : data
    };
    
    try {
        const response = await axios(config);
        return response.data; 
      } catch (error) {
        console.log(error);
        throw error;
      }
    
}

module.exports= confirmation
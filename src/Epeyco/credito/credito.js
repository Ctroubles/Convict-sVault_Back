var axios = require('axios');

async function credito(token){

    const url_apify = 'https://apify.epayco.co/';
    var data = JSON.stringify({
        "value": "500000",
        "docType": "CC",
        "docNumber": "123456789",
        "name": "jon",
        "lastName": "doe",
        "email": "jondoe@hotmail.com",
        "cellPhone": "0000000000",
        "phone": "0000000",
        "cardNumber": "4575623182290326",
        "cardExpYear": "2019",
        "cardExpMonth": "12",
        "cardCvc": "123",
        "dues": "1",
        "_cardTokenId": "ahYq8skKSzyMgcmwC"
    });
    
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${url_apify}payment/process`,
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

module.exports= credito
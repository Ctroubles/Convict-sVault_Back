var axios = require('axios');


async function efecty(token){

    const url_apify = 'https://apify.epayco.co/';
    var data = JSON.stringify({
        "description": "pay test",
        "value": 20000,
        "tax": 0,
        "taxBase": 0,
        "currency": "COP",
        "typePerson": "0",
        "docType": "CC",
        "docNumber": "123456789",
        "name": "Testing",
        "lastName": "PAYCO",
        "email": "test@mailinator.com",
        "cellPhone": "3010000001",
        "endDate": "23-08-23",
        "ip": "127.0.0.1",
        "paymentMethod": "EF"
    });
    
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${url_apify}payment/process/cash`,
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

module.exports= efecty
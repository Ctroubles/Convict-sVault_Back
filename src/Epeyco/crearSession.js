var axios = require('axios');
var data = '{\r\n    "name": "New Checkout",\r\n    "invoice": "prueba 121",\r\n    "description": "Nueva implementacion de seguridad",\r\n    "currency": "cop",\r\n    "amount": "20000",\r\n    "country": "CO",\r\n    "test": "true",\r\n    "ip": "186.97.212.162"\r\n}';

const GenereteToken = require('./implementacion');

async function makePaymentWithToken() {
    try {
        const token = await GenereteToken();
        if (!token) {
            console.log('Error al obtener el token');
            return;
        }

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '{{url_apify}}/payment/session/create',
            headers: {
                'Authorization': `Bearer ${token}`, // Aquí se coloca el token obtenido
                'Content-Type': 'application/json',
            },
            data: data
        };

        const response = await axios(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log(error);
    }
}



module.exports= makePaymentWithToken
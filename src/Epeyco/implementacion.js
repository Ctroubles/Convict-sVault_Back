var axios = require('axios');

async function GenereteToken() {
  const EPAYCO_PUBLIC_KEY = process.env.EPAYCO_PUBLIC_KEY;
  const EPAYCO_PRIVATE_KEY = process.env.EPAYCO_PRIVATE_KEY;
  const clientId = '961313';

  var url_apify = 'https://apify.epayco.co/';
  var data = ''; // Debes asignar aquí los datos necesarios para generar el token

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url_apify}login`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${EPAYCO_PUBLIC_KEY}:${EPAYCO_PRIVATE_KEY}`).toString('base64')}`,
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

    
    
    
    
///////////////////////////   SDK    /////////////////////////


// var epayco = require('epayco-js')({
//     apiKey: 'PUBLIC_KEY',
//     privateKey: 'PRIVATE_KEY',
//     lang: 'ES',
//     test: true
// })


// var credit_info = {
//     "card[number]": "4575623182290326",
//     "card[exp_year]": "2025",
//     "card[exp_month]": "12",
//     "card[cvc]": "123",
//     "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción 
// }
// epayco.token.create(credit_info)
//     .then(function(token) {
//         console.log(token);
//     })
//     .catch(function(err) {
//         console.log("err: " + err);
//     });

//     var customer_info = {
//         token_card: "toke_id",
//         name: "Joe",
//         last_name: "Doe", 
//         email: "joe@payco.co",
//         default: true,
//         city: "Bogota",
//         address: "Cr 4 # 55 36",
//         phone: "3005234321",
//         cell_phone: "3010000001"
//     }
//     epayco.customers.create(customer_info)
//         .then(function(customer) {
//             console.log(customer);
//         })
//         .catch(function(err) {
//             console.log("err: " + err);
//         });

//         epayco.customers.get("id_customer")
//     .then(function(customer) {
//         console.log(customer);
//     })
//     .catch(function(err) {
//         console.log("err: " + err);
//     });

//     epayco.customers.list()
//     .then(function(customers) {
//         console.log(customers);
//     })
//     .catch(function(err) {
//         console.log("err: " + err);
//     });

//     var update_customer_info = {
//         name: "Alex"
//     }
//     epayco.customers.update("id_customer", update_customer_info)
//         .then(function(customer) {
//             console.log(customer);
//         })
//         .catch(function(err) {
//             console.log("err: " + err);
//         });

//         var delete_customer_info = {
//             franchise : "visa",
//             mask : "457562******0326",
//             customer_id:"id_customer"
//         }
//         epayco.customers.delete(delete_customer_info)
//             .then(function(customer) {
//                 console.log(customer);
//             })
//             .catch(function(err) {
//                 console.log("err: " + err);
//             });

//             var addDefaultCard_customer = {
//                 franchise : "visa",
//                 token : "**********zL4gFB",
//                 mask : "457562******0326",
//                 customer_id:"id_customer"
//             }
//             epayco.customers.addDefaultCard(addDefaultCard_customer)
//                 .then(function(customer) {
//                     console.log(customer);
//                 })
//                 .catch(function(err) {
//                     console.log("err: " + err);
//                 });

//                 var add_customer_info = {
//                     token_card : "FevpWP4fwB4v6NMG2",
//                     customer_id:"id_customer"
//                 }
//                 epayco.customers.addNewToken(add_customer_info)
//                     .then(function(customer) {
//                         console.log(customer);
//                     })
//                     .catch(function(err) {
//                         console.log("err: " + err);
//                     });

//                     epayco.bank.getBanks()
//     .then(function(bank) {
//         console.log(bank);
//      })
//     .catch(function(err) {
//          console.log("err:" + err);
//      });
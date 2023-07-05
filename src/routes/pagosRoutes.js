const { Router }= require("express");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const pagosRoutes= Router()

const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

// create a new order
pagosRoutes.post("/api/orders", async (req, res) => {
  const order = await createOrder();
  try {
      res.json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// capture payment & store order information or fullfill order
pagosRoutes.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
      const captureData = await capturePayment(orderID);
      res.json(captureData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


pagosRoutes.post("/mailer", async (req, res)=>{
  try {
    const secretKey= "5M#ñPqTw$yE!@ñad6"
    const { fromMail, toMail, name, userId}= req.body;
     // Genera el token de verificación
     const verificationToken = jwt.sign({ userId }, secretKey);
     const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;
    console.log("correo enviado")
     // Configura el transportador de nodemailer
     const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'labodegadelreo.122@gmail.com',
        pass: 'jgfdwgttbsagfqex',
      },
    });

    // Envía el correo electrónico
    const logoUrl = `https://res.cloudinary.com/dfu27fldw/image/upload/v1688583817/logorecortadoooooo_1_fyaka2.png`;

    const info = await transporter.sendMail({
      from: fromMail,
      to: toMail,
      subject: '¡Gracias por comprar en Super Reo Y+!',
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Super Reo Y+</title>
      <style>
        body {
          justify-content: center;
          width: 420px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          color: #333;
        }

        .header {
          background-color: #2C2C25;
          padding: 16px;
          text-align: center;
        }

        .header h1 {
          color: #FFF;
          font-size: 24px;
          margin: 0;
        }

        .content {
          padding: 16px;
          background-color: #F2F2F2;
        }

        .content p {
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #999;
          margin-top: 16px;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .logo-container h1 {
          font-size: 44px;
          color: #009fe3;
          margin-right: 10px; /* Espacio entre el título y la imagen */
        }
      </style>
    </head>
    <body style="width: 440px; margin: 0 auto;">
      <div style="background-color: rgb(44, 44, 37); padding: 5px 0; height:100px">
        <div class="logo-container">
          <h1>
            <img src="${logoUrl}" alt="Logo de Super Reo Y+" style="width: 40px; height: 40px;">
            Super Reo Y+
          </h1>
        </div>
      </div>
      <div>
        <p>Hola, ${name}.</p>
        <p>Agradecemos tu compra y esperamos que disfrutes mucho tus productos.
         Queremos asegurarnos de que estés satisfecho con tu elección y que nuestros productos cumplan con tus expectativas.
          Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para brindarte el mejor servicio posible.</p>
      </div>
      <hr>
      <div class="footer">
        <p>Recuerda que cada compra que realizas contribuye a apoyar a personas en situación de reclusión. Si tienes un familiar que necesita ayuda mientras se encuentra privado de libertad, nuestro equipo está aquí para brindarte asistencia.</p>
        <p>Agradecemos tu apoyo y confianza. ¡Tu apoyo marca la diferencia!</p>
        <p>Todos los derechos reservados a Super Reo Y+ y sus desarrolladores</p>
      </div>
    </body>
    </html>
      `,
    });
    
    res.send('Correo enviado');
  } catch (error) {
    console.error(error)
    res.status(500).send({error: "Pago no autorizado"})
  }
})

  module.exports= pagosRoutes
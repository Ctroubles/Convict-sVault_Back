const { Router } = require('express');
const {getAllUsers, getUser, getDB, getUserDb, getUserById} = require("../controllers/user/getUser.js")
const createUser = require("../controllers/user/createUser")
const {deleteUser, activateUser, updateUser, giveAdmin, removeAdmin, addOrder, updateUserAdrees, deleteAddress, updateAddressById} = require('../controllers/user/updateUser.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
// const logo= require("../util/logorecortadoooooo (1).png")
const Users = require( "../models/user.js")


const userRoutes = Router();

userRoutes.get("/", async (req, res) =>{
    const {email}= req.query;
    try {
       if(email){
          return res.status(201).send(await getUser(email))
        }
        return res.status(201).send(await getAllUsers())
    } catch (error) {
        res.status(404).send(error.message)
    }
})

userRoutes.get('/usersById/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

 userRoutes.get("/db", async(req, res)=>{
    try {
       
        return res.status(201).send(await getDB());
        
     } catch (error) {
         res.status(404).send(error.message)
     }
 });

 userRoutes.get("/db/:email", async(req, res)=>{
    const {email}= req.params
    try {
        return res.status(200).send(await getUserDb(email))
    } catch (error) {
        res.status(404).send({error})
    }
})

userRoutes.get("/email/:email", async(req, res)=>{
     const {email}= req.params
     try {
         return res.status(200).send(await getUser(email))
     } catch (error) {
         res.status(404).send(error.message)
     }
 })

 userRoutes.post('/createuser', async (req, res) => {
    try {
      const user = req.body;
      if (!user) {
        throw new Error('El campo "email" es requerido.');
      }
  
      const user2 = await createUser(user);
      res.status(201).send(user2);
    } catch (error) {
      console.log(error.message);
      res.status(400).send(error.message);
    }
  });
 userRoutes.put("/:id", async(req, res)=>{
     const {id}= req.params
     try{
         return res.status(200).send(await deleteUser(id))
     } catch (error){
         res.status(400).send(error)
     }
 })

 userRoutes.put("/activate/:id", async(req, res)=>{
     const {id}= req.params
     try{
        const user= await activateUser(id)
         return res.status(200).send(user)
     } catch (error){
         res.status(400).send(error)
     }
 })

 userRoutes.put("/desactivate/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await deleteUser(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

userRoutes.put("/update/:id", async(req, res)=>{
     try {
         const {id} = req.params;
         const data = req.body;;
         await updateUser(id, data)
         res.status(200).send("Actualización exitosa")
     } catch (error) {
         res.status(400).send({error})
     }
 })
 
userRoutes.post("/update/address/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        await updateUserAdrees(id, data);
        res.status(200).send("Actualización de dirección exitosa");
    } catch (error) {
        console.log(error)
        res.status(400).send({error});
    }
})

userRoutes.put("/update/address/:userId/:id", async(req, res)=>{
    try {
        const {userId} = req.params;
        const {id} = req.params;
        const data = req.body;
        await updateAddressById(userId, id ,data);
        res.status(200).send("Actualización de dirección exitosa");
    } catch (error) {
        console.log(error)
        res.status(400).send({error});
    }
})

userRoutes.delete("/update/address/:userId/:id", async(req, res)=>{
    try {
        const {userId} = req.params;
        const {id} = req.params;
        await deleteAddress(userId, id);
        res.status(200).send("Actualización de dirección exitosa");
    } catch (error) {
        console.log(error)
        res.status(400).send({error});
    }
})

 userRoutes.put("/giveAdmin/:id", async(req, res)=>{
    const {id}= req.params
    try{
        return res.status(200).send(await giveAdmin(id))
    } catch (error) {
        res.status(400).send(error)
    }
 })

 userRoutes.put("/removeAdmin/:id", async(req, res)=>{
    const {id}= req.params
    try{
        return res.status(200).send(await removeAdmin(id))
    } catch (error) {
        res.status(400).send(error)
    }
 })

 userRoutes.get("/isAdmin/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await getUserById(id);
      if (user.isAdmin) {
        res.status(200).json({ isAdmin: true });
      } else {
        res.status(200).json({ isAdmin: false });
      }
    } catch (error) {
      res.status(400).json({ error: "Error al obtener el usuario" });
    }
  });
  

 userRoutes.put("/orders/:id", async(req, res)=>{
    const {id}= req.params
    const order= req.body
    try {
        return  res.status(200).send(await addOrder(id, order))
    } catch (error) {
        
    }
 })

 userRoutes.post('/addOrder/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.body.productId; // Suponiendo que el productId se envía en el cuerpo de la solicitud
  
      // Llama al controlador para agregar el pedido
      await addOrder(userId, productId);
  
      return res.status(200).json({ message: 'Producto agregado con éxito a la lista de pedidos.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

 ///////////send email ////////////////////

 userRoutes.post('/send-email', async (req, res) => {
    try {
      // Obtén los datos necesarios de la solicitud
      const secretKey= "5M#ñPqTw$yE!@ñad6"
      const { userId, email, name } = req.body;
  
      // Genera el token de verificación
      const verificationToken = jwt.sign({ userId:userId }, secretKey);
      const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;
  
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
      transporter.verify().then(()=>{
        console.log("Ready fpr send emails")
    })
      // Envía el correo electrónico
      const logoUrl= `https://res.cloudinary.com/dfu27fldw/image/upload/v1688583817/logorecortadoooooo_1_fyaka2.png`
      const info = await transporter.sendMail({
        from: '"¡Bienvenido a Super Reo Y+!" <labodegadelreo.122@gmail.com>',
        to: email,
        subject: '¡Bienvenido a Super Reo Y+!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Super Reo Y+</title>
            <style>
                body {
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
                   
                  }
                
                  .logo-container h1 {
                    color:#009fe3;
                    margin-right: 10px; /* Espacio entre el título y la imagen */
                  }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo-container">
                <h1>
                <img src="${logoUrl}" alt="Logo de Super Reo Y+" style="width: 40px; height: 40px;">
                Bienvenido a Super Reo Y+
                </h1>
                </div>
            </div>
            <div class="content">
                <p>Hola, ${name}.</p>
                <p>Nos complace recibirte en nuestra página. Esperamos que encuentres todo lo que necesitas y disfrutes de una experiencia excepcional. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. ¡Estamos aquí para asistirte!</p>
                <p>Explora nuestro catálogo de productos, descubre las últimas novedades y aprovecha nuestras increíbles ofertas. Queremos asegurarnos de que obtengas todo lo que necesitas para llevar a cabo tus proyectos de manera exitosa.</p>
                <p>Gracias por elegir Super Reo Y+. ¡Esperamos que tu visita sea satisfactoria y que regreses pronto!</p>
            </div>
            <hr>
            <div class="footer">
            <p>Cada compra realizada contribuye a apoyar a personas en situación de reclusión. Si tienes un familiar que necesita ayuda mientras se encuentra privado de libertad, nuestro equipo está aquí para brindarte asistencia.
             Agradecemos tu apoyo y confianza. ¡Tu apoyo marca la diferencia!</p>
                <p>Todos los derechos reservados a Super Reo Y+ y sus desarrolladores</p>
            </div>
        </body>
        </html>
        `,
      });
  
      console.log('Message sent:', info.messageId);
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  
      res.send('Correo enviado');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo electrónico');
    }
  });


  userRoutes.put("/update/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const data = req.body;;
        await updateUser(id, data)
        res.status(200).send("Actualización exitosa")
    } catch (error) {
        res.status(404).send({error})
    }
})

module.exports= userRoutes;
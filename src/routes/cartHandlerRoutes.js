const { Router }= require("express");

const {updateUser} = require('../controllers/user/updateUser.js');
const User = require( "../models/user.js")


const cartRoutes= Router();

cartRoutes.put("/addItem", async(req, res)=>{
    const user_id = req.body.userid
    const item_id = req.body.itemid
    try {
        const user = await User.findOne({ _id: user_id }).select('cart');
        const {cart} = user;
        if (cart) {
            let result = cart.reduce((acc, objeto, index) => {
                if (objeto.hasOwnProperty(item_id)) {
                    return { found_object: objeto, indiceEncontrado: index };
                }
                return acc;
            }, { found_object: null, indiceEncontrado: -1 });    

            if (result.found_object) {
                user.cart[result.indiceEncontrado]={[item_id]: Number(result.found_object[item_id]) + 1 };
                user.markModified('cart');
                await user.save()
            }else{
                user.cart.push({[item_id]:1})
                user.markModified('cart');
                const respuesta = await user.save()
            }
            res.status(200).send(user.cart)
            return
        }else{
            throw Error("Error al obtener el carrito de compras del usuario")
        }
        
    } catch (error) {
        res.status(400).send(error)
        return
    }
});

cartRoutes.put("/subtractItem", async(req, res)=>{
    const user_id = req.body.userid
    const item_id = req.body.itemid
    try {
        const user = await User.findOne({ _id: user_id }).select('cart');
        const {cart} = user;

        if (cart) {
            let result = cart.reduce((acc, objeto, index) => {
                if (objeto.hasOwnProperty(item_id)) {
                    return { found_object: objeto, indiceEncontrado: index };
                }
                return acc;
            }, { found_object: null, indiceEncontrado: -1 });            
            if (result.found_object[item_id] > 1) {
                user.cart[result.indiceEncontrado]={[item_id]: Number(result.found_object[item_id]) - 1 };
                await user.save()
            }else{
                user.cart.splice(result.indiceEncontrado, 1);
                await user.save()
            }
            res.status(200).send(user.cart)
            return
        }else{
            throw Error("Error al obtener el carrito de compras del usuario")
        }
        
    } catch (error) {
        res.status(404).send({error})
        return
    }
});

cartRoutes.put("/removeItem", async(req, res)=>{
    const user_id = req.body.userid
    const item_id = req.body.itemid
    try {
        const user = await User.findOne({ _id: user_id }).select('cart');
        const {cart} = user;
        if (cart) {
            let result = cart.reduce((acc, objeto, index) => {
                if (objeto.hasOwnProperty(item_id)) {
                    return { found_object: objeto, indiceEncontrado: index };
                }
                return acc;
            }, { found_object: null, indiceEncontrado: -1 });        
            if (result.found_object) {
                user.cart.splice(result.indiceEncontrado, 1);
                await user.save()
                res.status(200).send(user.cart)
                return
            }else{
                throw Error("El carrito de usuario no tiene el item a eliminar")
            }
        }else{
            throw Error("Error al obtener el carrito de compras del usuario")
        }
    } catch (error) {
        res.status(404).send({error})
    }
});


module.exports = cartRoutes;
